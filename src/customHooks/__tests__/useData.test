import { render, act, renderHook  } from '@testing-library/react';

import { useData } from '../useData';
import indexedDBController from '../../indexedDB/indexedDB';
jest.mock('../../indexedDB/indexedDB', () => ({
    getListOfRecords: jest.fn(() => Promise.resolve(['data1', 'data2'])),
    addData: jest.fn(),
    updateARecord: jest.fn(),
    deleteARecord: jest.fn(),
  }));
  
  jest.mock('../../App', () => ({
    GetDataBaseContext: jest.fn(() => ({
      db: {}, // Provide a mock context value for testing
    })),
}));


describe('useData', () => {
    it('fetches data on mount', async () => {
      // Mock the getListOfRecords function
      indexedDBController.getListOfRecords.mockResolvedValue(['data1', 'data2']);
  
      let result;
      await act(async () => {
        // Render the component
        result = renderHook(() => useData({ store: 'store', index: 'index', keyPath: 'keyPath' }));
      });
  
      expect(result.current[0]).toEqual(['data1', 'data2']);
    });
  
    it('updates data correctly', async () => {
      // Mock the updateARecord function
      indexedDBController.updateARecord.mockResolvedValue();
  
      const { result } = renderHook(() => useData({ store: 'store', index: 'index', keyPath: 'keyPath' }));
  
      await act(async () => {
        // Call the updateData function
        await result.current[1]({ type: 'update', indexField: 'indexField', newVal: { indexField: 'newValue' } });
      });
  
      expect(indexedDBController.updateARecord).toHaveBeenCalledWith({}, 'store', { indexField: 'newValue' });
      expect(result.current[0]).toEqual([{ indexField: 'newValue' }]);
    });
  
    // Add more test cases for different scenarios
  });