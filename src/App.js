import { useState, useRef, useEffect, Fragment } from 'react';
import clsx from 'clsx';

import './App.css';

function App({ items, location }) {
  const [{ hiddenItems, isInitial }, setHiddenItems] = useState({
    hiddenItems: [],
    isInitial: true,
  });
  const rootRef = useRef();
  const itemsRef = useRef([]);
  const dotsRef = useRef();
  const cache = useRef();

  useEffect(() => {
    function handleResize() {
      if (!rootRef.current) {
        return;
      }

      const rootWidth = rootRef.current.getBoundingClientRect().width;
      const tempHiddenItems = [];

      if (!cache.current) {
        cache.current = itemsRef.current.map((item, index) => ({
          width: Math.trunc(item.getBoundingClientRect().width),
          index,
        }));
      }
      const list = [...cache.current];

      while (list.length > 2) {
        const widthItems = list.reduce((acc, item) => acc + item.width, 0);

        if (widthItems < rootWidth - Math.trunc(dotsRef.current.getBoundingClientRect().width)) {
          break;
        }

        tempHiddenItems.push(list[1].index);
        list.splice(1, 1);
      }

      setHiddenItems({
        hiddenItems: tempHiddenItems,
        isInitial: false,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!Array.isArray(items) || items.length < 2 || items[0].url === location) {
    return null;
  }

  const dotsNode = (
    <>
      <div className="dots">...</div>
      <div className="arrow">{'->'}</div>
    </>
  );

  return (
    <>
      <div ref={rootRef} className={clsx('root', { hidden: isInitial })}>
        {items.map(
          (item, index) =>
            !hiddenItems.includes(index) && (
              <Fragment key={index}>
                <div
                  ref={el => {
                    itemsRef.current[index] = el;
                  }}
                  className="item"
                >
                  <a className={clsx('title', { active: item.url === location })} href={item.url}>{item.title}</a>
                  {index < items.length - 1 && <div className="arrow">{'->'}</div>}
                </div>
                {index === 0 && hiddenItems.length > 0 && dotsNode}
              </Fragment>
            ),
        )}
        <div ref={dotsRef} className={clsx("hidden", "fake-dots")}>
          {dotsNode}
        </div>
      </div>
    </>
  );
}

export default App;
