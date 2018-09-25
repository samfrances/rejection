import { describe } from 'riteway';
import { pickAll } from 'ramda';

import { asksReducer as reducer, defaultState } from './reducers';
import { createAsk } from './actions';

const expectedProps = pickAll([
  'askee',
  'question',
  'status',
]);

describe('src/features/asks/reducer', async should => {
  const { assert } = should();

  assert({
    given: 'no state',
    should: 'return the default state',
    actual: reducer(),
    expected: defaultState,
  });

  assert({
    given: 'an unrecognized action',
    should: 'return the passed in state',
    actual: reducer({ foo: 1 }, { type: '__UNKNOWN__' }),
    expected: { foo: 1 },
  });

  {
    const action = createAsk({ question: 'Can I have a raise?', askee: 'Boss' });
    const uid = action.payload.id;
    const resultingState = reducer(defaultState, action);
    const actual = expectedProps(
      resultingState.byId[uid]
    );
    const expected = { askee: 'Boss', question: 'Can I have a raise?', status: 'Unanswered' };

    assert({
      given: 'an action to create an ask',
      should: 'return the state with the ask added',
      actual,
      expected,
    });
  }

  {
    const action = createAsk({ question: 'Can I have a raise?', askee: 'Boss' });
    const resultingState = reducer(defaultState, action);
    const resultingAsk = Object.values(resultingState.byId)[0];
    const askProps = Object.keys(resultingAsk);

    assert({
      given: 'an an action to create an ask',
      should: 'return the state with an ask added, which has a timestamp and an id',
      actual: askProps.includes('id') && askProps.includes('timestamp'),
      expected: true,
    });
  }
});
