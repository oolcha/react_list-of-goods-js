import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD = {
  NONE: 'none',
  NAME: 'name',
  LENGTH: 'length',
};

const getPreparedGoods = (goods, sortField, isReversed) => {
  const visibleGoods = [...goods];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD.NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );
  const handleSort = sort => () => setSortField(sort);
  const handleReverse = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const handleReset = () => {
    setSortField(SORT_FIELD.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSort(SORT_FIELD.NAME)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD.NAME })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SORT_FIELD.LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELD.NONE || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>

    </div>
  );
};
