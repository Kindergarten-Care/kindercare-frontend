'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@kindercare/core';
import { kcToast } from '@kindercare/ui';
import { useParent } from '@/contexts/ParentContext';
import { useStudent } from '@/contexts/StudentContext';
import { parentService } from '@/services/Parent/ParentService';
import {
  IconSettings, IconLogout, IconClose, IconProfile, IconLock, IconBell,
  IconMail, IconPhone, IconBriefcase, IconMapPin, IconCalendar,
  IconEye, IconEyeOff, IconUpload, IconCheck, IconShieldInfo, IconIdCard,
} from '@/assets/icons/dashboard';
import { resolveRelationship } from '../utils/layoutHelpers';
import * as S from './styles';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaneKey = 'profile' | 'password' | 'notify';

const PANES: Record<PaneKey, { title: string; desc: string }> = {
  profile: { title: 'Thông tin cá nhân', desc: 'Cập nhật thông tin liên hệ của bạn' },
  password: { title: 'Đổi mật khẩu', desc: 'Bảo mật tài khoản của bạn' },
  notify: { title: 'Thông báo', desc: 'Chọn cách bạn muốn nhận tin từ trường' },
};

const STRENGTH_LEVELS = [
  { label: 'Độ mạnh mật khẩu', color: '#eef2ee', n: 0 },
  { label: 'Yếu', color: '#dc2626', n: 1 },
  { label: 'Trung bình', color: '#d97706', n: 2 },
  { label: 'Khá', color: '#2563eb', n: 3 },
  { label: 'Mạnh', color: '#16803d', n: 4 },
];

interface NotifyItem {
  key: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  on: boolean;
}

function formatDobInput(ts: number | null | undefined): string {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${d.getFullYear()}`;
}

function parseDobInput(value: string): number | undefined {
  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return undefined;
  const [, day, month, year] = match;
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return Math.floor(d.getTime() / 1000);
}

const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { parentProfile, updateProfile } = useParent();
  const { activeStudent } = useStudent();
  const [pane, setPane] = useState<PaneKey>('profile');
  const [saving, setSaving] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const rawRelationship = activeStudent?.relationship ?? user?.relationship ?? user?.children?.[0]?.relationship;
  const relationshipLabel = resolveRelationship(rawRelationship, 'vi').label || 'Chưa cập nhật';

  // ---- profile form ----
  const [fullName, setFullName] = useState(parentProfile?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(parentProfile?.phoneNumber || '');
  const [email, setEmail] = useState(parentProfile?.email || '');
  const [dob, setDob] = useState(formatDobInput(parentProfile?.dateOfBirth));
  const [job, setJob] = useState(parentProfile?.job || '');
  const [address, setAddress] = useState(parentProfile?.address || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Re-sync form fields whenever the modal opens or the profile data arrives/changes,
  // since this component stays mounted (hidden) and parentProfile loads asynchronously.
  useEffect(() => {
    if (!isOpen || !parentProfile) return;
    setFullName(parentProfile.fullName || '');
    setPhoneNumber(parentProfile.phoneNumber || '');
    setEmail(parentProfile.email || '');
    setDob(formatDobInput(parentProfile.dateOfBirth));
    setJob(parentProfile.job || '');
    setAddress(parentProfile.address || '');
  }, [isOpen, parentProfile]);

  // ---- password form ----
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  // ---- notification prefs (mock) ----
  const [notifyList, setNotifyList] = useState<NotifyItem[]>([
    { key: 'push', icon: <IconBell size={19} />, title: 'Thông báo đẩy (App)', desc: 'Nhận thông báo ngay trên ứng dụng', on: true },
    { key: 'email', icon: <IconMail size={19} />, title: 'Email', desc: 'Bản tin & thông báo quan trọng qua email', on: true },
    { key: 'sms', icon: <IconPhone size={19} />, title: 'Tin nhắn SMS', desc: 'Thông báo khẩn qua tin nhắn', on: false },
    { key: 'daily', icon: <IconCalendar size={19} />, title: 'Tóm tắt cuối ngày', desc: 'Nhật ký bé gửi lúc 17:00 mỗi ngày', on: true },
  ]);

  const pwRules = useMemo(() => ({
    len: newPw.length >= 6,
    upper: /[A-Z]/.test(newPw),
    num: /[0-9]/.test(newPw),
    special: /[^A-Za-z0-9]/.test(newPw),
  }), [newPw]);

  const pwScore = Object.values(pwRules).filter(Boolean).length;
  const pwLevel = STRENGTH_LEVELS[newPw ? pwScore : 0];

  const initials = (parentProfile?.fullName || 'PH')
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  if (!isOpen) return null;

  const displayAvatarUrl = avatarPreview || parentProfile?.avatarUrl;

  const handleAvatarPick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleAvatarClear = (): void => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSave = async (): Promise<void> => {
    if (!fullName.trim() || !phoneNumber.trim() || !email.trim()) {
      kcToast.warning('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }

    setSaving(true);
    try {
      const dobTimestamp = parseDobInput(dob);
      await updateProfile({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        job: job.trim(),
        address: address.trim(),
        ...(dobTimestamp !== undefined ? { dateOfBirth: dobTimestamp } : {}),
        ...(avatarFile ? { avatar: avatarFile } : {}),
      });
      setAvatarFile(null);
      setAvatarPreview(null);
      kcToast.success('Đã lưu thay đổi thành công');
    } catch (err: any) {
      kcToast.error(err?.message || 'Cập nhật thông tin thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (): Promise<void> => {
    if (!currentPw || !newPw || !confirmPw) {
      kcToast.warning('Vui lòng điền đầy đủ thông tin');
      return;
    }
    if (newPw !== confirmPw) {
      kcToast.error('Mật khẩu xác nhận không khớp');
      return;
    }
    if (newPw.length < 6) {
      kcToast.warning('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPw === currentPw) {
      kcToast.warning('Mật khẩu mới không được trùng mật khẩu hiện tại');
      return;
    }

    setChangingPw(true);
    try {
      await parentService.changePassword({
        currentPassword: currentPw,
        newPassword: newPw,
        confirmNewPassword: confirmPw,
      });
      kcToast.success('Đổi mật khẩu thành công');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
    } catch (err: any) {
      kcToast.error(err?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setChangingPw(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    onClose();
    await logout();
  };

  const toggleNotify = (key: string): void => {
    setNotifyList(list => list.map(n => (n.key === key ? { ...n, on: !n.on } : n)));
  };

  return (
    <S.Backdrop onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <S.Panel>
        <S.Rail>
          <S.RailHead>
            <S.RailMark><IconSettings size={20} /></S.RailMark>
            <div>
              <S.RailTitle>Cài đặt</S.RailTitle>
              <S.RailSub>Tài khoản phụ huynh</S.RailSub>
            </div>
          </S.RailHead>

          <S.RailUser>
            <S.RailAv>
              {displayAvatarUrl ? (
                <img src={displayAvatarUrl} alt={parentProfile?.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                initials
              )}
            </S.RailAv>
            <div style={{ minWidth: 0 }}>
              <S.RailUserName>{parentProfile?.fullName || 'Phụ huynh'}</S.RailUserName>
              <S.RailUserMail>{parentProfile?.email}</S.RailUserMail>
            </div>
          </S.RailUser>

          <S.RailNav>
            <S.RailItem $active={pane === 'profile'} onClick={() => setPane('profile')}>
              <IconProfile size={19} /> Thông tin cá nhân
            </S.RailItem>
            <S.RailItem $active={pane === 'password'} onClick={() => setPane('password')}>
              <IconLock size={19} /> Đổi mật khẩu
            </S.RailItem>
            <S.RailItem $active={pane === 'notify'} onClick={() => setPane('notify')}>
              <IconBell size={19} /> Thông báo
            </S.RailItem>
          </S.RailNav>

          <S.RailFoot>
            <S.RailLogout onClick={handleLogout}>
              <IconLogout size={18} /> Đăng xuất
            </S.RailLogout>
          </S.RailFoot>
        </S.Rail>

        <S.Main>
          <S.Top>
            <div>
              <S.TopTitle>{PANES[pane].title}</S.TopTitle>
              <S.TopDesc>{PANES[pane].desc}</S.TopDesc>
            </div>
            <S.CloseBtn onClick={onClose}><IconClose size={18} /></S.CloseBtn>
          </S.Top>

          <S.Scroll>
            {pane === 'profile' && (
              <S.Pane>
                <S.AvatarEdit>
                  <S.AeAv>
                    {displayAvatarUrl ? (
                      <img src={displayAvatarUrl} alt={parentProfile?.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      initials
                    )}
                  </S.AeAv>
                  <S.AeBody>
                    <h3>Ảnh đại diện</h3>
                    <p>JPG, PNG, WEBP tối đa 5MB. Nên dùng ảnh vuông.</p>
                    <S.AeActions>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        style={{ display: 'none' }}
                        onChange={handleAvatarPick}
                      />
                      <S.Btn $variant="brand" style={{ padding: '8px 15px', fontSize: '12.5px' }} onClick={() => avatarInputRef.current?.click()}>
                        <IconUpload size={15} /> Tải ảnh lên
                      </S.Btn>
                      {avatarPreview && (
                        <S.Btn $variant="ghost" style={{ padding: '8px 15px', fontSize: '12.5px' }} onClick={handleAvatarClear}>
                          Xóa ảnh
                        </S.Btn>
                      )}
                    </S.AeActions>
                  </S.AeBody>
                </S.AvatarEdit>

                <S.SectionTitle>Thông tin cơ bản</S.SectionTitle>
                <S.FormGrid>
                  <S.Field>
                    <S.FieldLabel>Họ và tên <span className="req">*</span></S.FieldLabel>
                    <S.InputWrap>
                      <IconProfile size={17} />
                      <S.TextInput value={fullName} onChange={e => setFullName(e.target.value)} />
                    </S.InputWrap>
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>Mối quan hệ với bé</S.FieldLabel>
                    <S.InputWrap>
                      <IconProfile size={17} />
                      <S.TextInput value={relationshipLabel} disabled />
                    </S.InputWrap>
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>Số điện thoại <span className="req">*</span></S.FieldLabel>
                    <S.InputWrap>
                      <IconPhone size={17} />
                      <S.TextInput type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    </S.InputWrap>
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>Email <span className="req">*</span></S.FieldLabel>
                    <S.InputWrap>
                      <IconMail size={17} />
                      <S.TextInput type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </S.InputWrap>
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>Ngày sinh</S.FieldLabel>
                    <S.InputWrap>
                      <IconCalendar size={17} />
                      <S.TextInput value={dob} onChange={e => setDob(e.target.value)} placeholder="dd/mm/yyyy" />
                    </S.InputWrap>
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>Nghề nghiệp</S.FieldLabel>
                    <S.InputWrap>
                      <IconBriefcase size={17} />
                      <S.TextInput value={job} onChange={e => setJob(e.target.value)} />
                    </S.InputWrap>
                  </S.Field>
                  <S.Field>
                    <S.FieldLabel>Số CCCD</S.FieldLabel>
                    <S.InputWrap>
                      <IconIdCard size={17} />
                      <S.TextInput value={parentProfile?.idCard || 'Chưa cập nhật'} disabled />
                    </S.InputWrap>
                  </S.Field>
                  <S.Field $full>
                    <S.FieldLabel>Địa chỉ</S.FieldLabel>
                    <S.InputWrap>
                      <IconMapPin size={17} />
                      <S.TextInput value={address} onChange={e => setAddress(e.target.value)} />
                    </S.InputWrap>
                  </S.Field>
                </S.FormGrid>
              </S.Pane>
            )}

            {pane === 'password' && (
              <S.Pane>
                <S.SectionTitle>Đổi mật khẩu đăng nhập</S.SectionTitle>
                <S.FormGrid>
                  <S.Field $full>
                    <S.FieldLabel>Mật khẩu hiện tại <span className="req">*</span></S.FieldLabel>
                    <S.InputWrap>
                      <IconLock size={17} />
                      <S.TextInput
                        type={showCurrentPw ? 'text' : 'password'}
                        value={currentPw}
                        onChange={e => setCurrentPw(e.target.value)}
                      />
                      <S.EyeBtn onClick={() => setShowCurrentPw(v => !v)} type="button">
                        {showCurrentPw ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </S.EyeBtn>
                    </S.InputWrap>
                  </S.Field>

                  <S.Field $full>
                    <S.FieldLabel>Mật khẩu mới <span className="req">*</span></S.FieldLabel>
                    <S.InputWrap>
                      <IconLock size={17} />
                      <S.TextInput
                        type={showNewPw ? 'text' : 'password'}
                        value={newPw}
                        placeholder="Nhập mật khẩu mới"
                        onChange={e => setNewPw(e.target.value)}
                      />
                      <S.EyeBtn onClick={() => setShowNewPw(v => !v)} type="button">
                        {showNewPw ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </S.EyeBtn>
                    </S.InputWrap>

                    <S.Strength>
                      <S.StrengthBars>
                        {[0, 1, 2, 3].map(i => (
                          <S.StrengthBar key={i} $active={i < pwLevel.n} $color={pwLevel.color} />
                        ))}
                      </S.StrengthBars>
                      <S.StrengthLabel $color={newPw ? pwLevel.color : undefined}>
                        {newPw ? `Độ mạnh: ${pwLevel.label}` : 'Độ mạnh mật khẩu'}
                      </S.StrengthLabel>
                    </S.Strength>

                    <S.ReqList>
                      <S.ReqItem $ok={pwRules.len}><S.ReqIcon $ok={pwRules.len}><IconCheck size={10} /></S.ReqIcon> Ít nhất 6 ký tự</S.ReqItem>
                      <S.ReqItem $ok={pwRules.upper}><S.ReqIcon $ok={pwRules.upper}><IconCheck size={10} /></S.ReqIcon> Có chữ hoa</S.ReqItem>
                      <S.ReqItem $ok={pwRules.num}><S.ReqIcon $ok={pwRules.num}><IconCheck size={10} /></S.ReqIcon> Có chữ số</S.ReqItem>
                      <S.ReqItem $ok={pwRules.special}><S.ReqIcon $ok={pwRules.special}><IconCheck size={10} /></S.ReqIcon> Có ký tự đặc biệt</S.ReqItem>
                    </S.ReqList>
                  </S.Field>

                  <S.Field $full>
                    <S.FieldLabel>Xác nhận mật khẩu mới <span className="req">*</span></S.FieldLabel>
                    <S.InputWrap>
                      <IconLock size={17} />
                      <S.TextInput
                        type={showConfirmPw ? 'text' : 'password'}
                        value={confirmPw}
                        placeholder="Nhập lại mật khẩu mới"
                        onChange={e => setConfirmPw(e.target.value)}
                      />
                      <S.EyeBtn onClick={() => setShowConfirmPw(v => !v)} type="button">
                        {showConfirmPw ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                      </S.EyeBtn>
                    </S.InputWrap>
                    {confirmPw && (
                      <S.Hint style={{ color: confirmPw === newPw ? 'var(--green-ok, #16803d)' : 'var(--red, #dc2626)' }}>
                        {confirmPw === newPw ? '✓ Mật khẩu khớp' : '✗ Mật khẩu chưa khớp'}
                      </S.Hint>
                    )}
                  </S.Field>
                </S.FormGrid>

                <S.Divider />
                <S.Hint style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '12.5px' }}>
                  <IconShieldInfo size={15} color="var(--muted-2, #9ca3af)" /> Vì lý do bảo mật, bạn sẽ cần đăng nhập lại sau khi đổi mật khẩu.
                </S.Hint>

                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                  <S.Btn $variant="brand" onClick={handleChangePassword} disabled={changingPw}>
                    <IconLock size={16} /> {changingPw ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                  </S.Btn>
                </div>
              </S.Pane>
            )}

            {pane === 'notify' && (
              <S.Pane>
                <S.SectionTitle>Nhận thông báo qua</S.SectionTitle>
                {notifyList.map((n, i) => (
                  <S.NotifyRow key={n.key} $bordered={i < notifyList.length - 1}>
                    <S.NotifyIcon>{n.icon}</S.NotifyIcon>
                    <S.NotifyBody>
                      <strong>{n.title}</strong>
                      <span>{n.desc}</span>
                    </S.NotifyBody>
                    <S.NotifyToggle $on={n.on} onClick={() => toggleNotify(n.key)}>
                      <S.NotifyToggleDot $on={n.on} />
                    </S.NotifyToggle>
                  </S.NotifyRow>
                ))}
              </S.Pane>
            )}
          </S.Scroll>

          {pane !== 'password' && (
            <S.Foot>
              <S.FootNote><IconShieldInfo size={14} /> Thay đổi được lưu tức thì</S.FootNote>
              <S.FootActions>
                <S.Btn $variant="ghost" onClick={onClose} disabled={saving}>Hủy</S.Btn>
                <S.Btn $variant="brand" onClick={handleSave} disabled={saving}>
                  <IconCheck size={16} /> {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </S.Btn>
              </S.FootActions>
            </S.Foot>
          )}
        </S.Main>
      </S.Panel>
    </S.Backdrop>
  );
};

export default AccountSettingsModal;
