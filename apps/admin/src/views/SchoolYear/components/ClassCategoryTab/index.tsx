import React from 'react';
import { EditIcon, SettingsIcon, ClassIcon } from '@kindercare/ui';
import {
  Card,
  Table,
  Th,
  Td,
  ClassNameWrapper,
  IconBox,
  ClassNameText,
  CodeBadge,
  AgeText,
  ClassCountText,
  ActionWrapper,
  ActionIconBtn
} from './styles';

const mockData = [
  { id: '1', name: 'Khối Lá', code: 'K-LA', age: '5 - 6 tuổi', count: 12, bgColor: 'rgba(4, 110, 30, 0.1)', iconColor: '#046e1e' },
  { id: '2', name: 'Khối Chồi', code: 'K-CHOI', age: '4 - 5 tuổi', count: 15, bgColor: 'rgba(131, 200, 253, 0.2)', iconColor: '#83c8fd' },
  { id: '3', name: 'Khối Mầm', code: 'K-MAM', age: '3 - 4 tuổi', count: 10, bgColor: 'rgba(119, 90, 32, 0.1)', iconColor: '#775a20' },
];

export const ClassCategoryTab: React.FC = () => {
  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <Th>TÊN KHỐI</Th>
            <Th>MÃ KHỐI</Th>
            <Th>ĐỘ TUỔI</Th>
            <Th>SỐ LƯỢNG LỚP</Th>
            <Th>THAO TÁC</Th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.id}>
              <Td>
                <ClassNameWrapper>
                  <IconBox $bgColor={item.bgColor}>
                    <ClassIcon size={16} color={item.iconColor} />
                  </IconBox>
                  <ClassNameText>{item.name}</ClassNameText>
                </ClassNameWrapper>
              </Td>
              <Td>
                <CodeBadge>{item.code}</CodeBadge>
              </Td>
              <Td>
                <AgeText>{item.age}</AgeText>
              </Td>
              <Td>
                <ClassCountText>{item.count} Lớp</ClassCountText>
              </Td>
              <Td>
                <ActionWrapper>
                  <ActionIconBtn>
                    <EditIcon size={14} />
                  </ActionIconBtn>
                  <ActionIconBtn>
                    <SettingsIcon size={14} />
                  </ActionIconBtn>
                </ActionWrapper>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
