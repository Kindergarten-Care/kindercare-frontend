import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  
  svg {
    color: #4B5563;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #D1D5DB;
  font-size: 16px;
  color: #111827;
  outline: none;
  &:focus {
    border-color: #2563EB;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
`;

export const SubmitButton = styled.button`
  background-color: #2563EB;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1D4ED8;
  }
`;

export const RequirementsCard = styled.div`
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  width: 280px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const RequirementTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RequirementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RequirementItem = styled.li`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SettingBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SettingText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SettingTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #111827;
`;

export const SettingDescription = styled.span`
  font-size: 14px;
  color: #6B7280;
`;

export const ToggleSwitch = styled.div<{ $active: boolean }>`
  width: 44px;
  height: 24px;
  background-color: ${({ $active }) => ($active ? '#10B981' : '#E5E7EB')};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    background-color: #FFFFFF;
    border-radius: 50%;
    transition: left 0.2s;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

export const DeviceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const DeviceIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #F3F4F6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B5563;
`;

export const LogoutButton = styled.button`
  color: #EF4444;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;
