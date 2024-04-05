import {renderHook, act} from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {usePeople} from './usePeople';

const mockData = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Alice'},
];

const mockAxios = new MockAdapter(axios);

describe('usePeople hook', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('fetches people data correctly', async () => {
    mockAxios.onGet('/people').reply(200, mockData);

    const {result, waitForNextUpdate} = renderHook(() => usePeople(1));

    await waitForNextUpdate();

    expect(result.current.people).toEqual(mockData);
  });

  it('filters people data based on query', async () => {
    mockAxios.onGet('/people').reply(200, mockData);

    const {result, waitForNextUpdate} = renderHook(() => usePeople(1));

    await waitForNextUpdate();

    act(() => {
      result.current.setQuery('John');
    });

    expect(result.current.people).toEqual([{id: 1, name: 'John'}]);
  });

  it('cancels axios request when component unmounts', async () => {
    const cancelTokenSource = {cancel: jest.fn()};
    mockAxios.onGet('/people').reply(200, mockData);

    const {result, unmount} = renderHook(() => usePeople(1));

    unmount();

    expect(cancelTokenSource.cancel).toHaveBeenCalledTimes(1);
  });

  // Agrega más pruebas según sea necesario para otras funcionalidades del hook
});
