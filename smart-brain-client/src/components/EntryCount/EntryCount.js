import React from 'react';

const EntryCount = ({ name, entries }) => {
  return (
    <div>
      <div className='white f2'>
        {(entries <= 1)
          ? name + ", your total entry is"
          : name + ", your total entries are"}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default EntryCount;
