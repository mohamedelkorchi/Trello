import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateCardScreen from '../CreateCardScreen';
import { createCard, fetchMembers } from '../../services/TrelloCalls';

jest.mock('../../services/TrelloCalls', () => ({
  createCard: jest.fn(),
  fetchMembers: jest.fn(),
}));

describe('CreateCardScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    fetchMembers.mockResolvedValueOnce([
      { id: 'memberId1', fullName: 'John Doe' },
      { id: 'memberId2', fullName: 'Jane Smith' },
    ]);

    const { getByPlaceholderText, getByText } = render(<CreateCardScreen route={{ params: { listId: 'listId', boardId: 'boardId' } }} />);
    
    expect(getByPlaceholderText('Nom de la carte')).toBeDefined();
    expect(getByPlaceholderText('Description')).toBeDefined();
    expect(getByPlaceholderText('Sélectionnez un membre...')).toBeDefined();
    expect(getByText('Créer une carte')).toBeDefined();
  });

  it('calls createCard function with correct parameters when form is submitted', async () => {
    fetchMembers.mockResolvedValueOnce([
      { id: 'memberId1', fullName: 'John Doe' },
      { id: 'memberId2', fullName: 'Jane Smith' },
    ]);

    const { getByPlaceholderText, getByText } = render(<CreateCardScreen route={{ params: { listId: 'listId', boardId: 'boardId' } }} />);
    
    fireEvent.changeText(getByPlaceholderText('Nom de la carte'), 'Test Card');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Test Description');
    fireEvent.press(getByText('Créer une carte'));

    expect(createCard).toHaveBeenCalledWith('listId', 'Test Card', 'Test Description', 'memberId1');
  });

  // Add more test cases as needed
});
