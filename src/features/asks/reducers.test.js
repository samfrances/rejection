import { describe } from 'riteway';
import { pickAll } from 'ramda';

import { asksReducer as reducer, defaultState } from './reducers';
import { createAsk, rejectAsk, acceptAsk } from './actions';

const expectedProps = pickAll([
  'askee',
  'question',
  'status',
]);

describe('src/features/asks/reducer', async assert => {

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

  {

    const initialAction = createAsk({ question: 'Can I have a raise?', askee: 'Boss' });

    const startingState = reducer(undefined, initialAction);

    const id = initialAction.payload.id;

    const action = rejectAsk({ id });

    const nextState = reducer(startingState, action);

    assert({
      given: 'an existing ask, in whatever state, and a reject action',
      should: 'return the existing state, but with the ask status field set to "Rejected"',
      actual: nextState.byId[id].status,
      expected: 'Rejected',
    });
  }

  {

    const initialAction = createAsk({ question: 'Can I have a raise?', askee: 'Boss' });

    const startingState = reducer(undefined, initialAction);

    const id = initialAction.payload.id;

    const action = acceptAsk({ id });

    const nextState = reducer(startingState, action);

    assert({
      given: 'an existing ask, in whatever state, and a accept action',
      should: 'return the existing state, but with the ask status field set to "Accepted"',
      actual: nextState.byId[id].status,
      expected: 'Accepted',
    });
  }

});
