import React from 'react';
import ListOfMlmUsers from './MlmUserComp/ListOfMlmUsers';

function MainMlmUser() {
  return (
    <>
          <div className="flex flex-col gap-3 justify-center items-center">
        <ListOfMlmUsers/>
      </div>
    </>
  );
}

export default MainMlmUser;
