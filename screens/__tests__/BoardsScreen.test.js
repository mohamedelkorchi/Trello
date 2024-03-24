import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BoardsScreen from '../BoardsScreen';
import { deleteWorkspace, fetchBoardsByWorkspace } from '../../services/TrelloCalls';

jest.mock('../../services/TrelloCalls', () => ({
  deleteWorkspace: jest.fn(),
  fetchBoardsByWorkspace: jest.fn(),
}));

describe('BoardsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders boards correctly', async () => {
    fetchBoardsByWorkspace.mockResolvedValueOnce([
      { id: 'boardId1', name: 'Board 1' },
      { id: 'boardId2', name: 'Board 2' },
    ]);

    const { getByText } = render(<BoardsScreen route={{ params: { workspaceId: 'workspaceId', workspaceName: 'Workspace Name' } }} />);
    
    await waitFor(() => expect(fetchBoardsByWorkspace).toHaveBeenCalledTimes(1));

    expect(getByText('Board 1')).toBeDefined();
    expect(getByText('Board 2')).toBeDefined();
  });

  it('calls deleteWorkspace function when delete button is pressed', async () => {
    const { getByText } = render(<BoardsScreen route={{ params: { workspaceId: 'workspaceId', workspaceName: 'Workspace Name' } }} />);

    fireEvent.press(getByText('Supprimer'));
    await waitFor(() => expect(deleteWorkspace).toHaveBeenCalledTimes(1));
  });
});
