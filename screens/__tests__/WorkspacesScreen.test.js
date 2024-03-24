import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WorkspaceScreen from '../WorkspaceScreen';
import { fetchWorkspaces } from '../../services/TrelloCalls';

jest.mock('../../services/TrelloCalls', () => ({
  fetchWorkspaces: jest.fn(),
}));

describe('WorkspaceScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders workspaces correctly', async () => {
    fetchWorkspaces.mockResolvedValueOnce([
      { id: 'workspaceId1', displayName: 'Workspace 1' },
      { id: 'workspaceId2', displayName: 'Workspace 2' },
    ]);

    const { getByText } = render(<WorkspaceScreen navigation={{ navigate: jest.fn() }} />);
    
    await waitFor(() => expect(fetchWorkspaces).toHaveBeenCalledTimes(1));

    expect(getByText('Workspace 1')).toBeDefined();
    expect(getByText('Workspace 2')).toBeDefined();
  });

  it('navigates to Boards screen when workspace item is pressed', async () => {
    const { getByText } = render(<WorkspaceScreen navigation={{ navigate: jest.fn() }} />);
    
    fireEvent.press(getByText('Workspace 1'));
    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('Boards', {
      workspaceId: 'workspaceId1',
      workspaceName: 'Workspace 1',
    }));
  });
});
