import React, { FC } from 'react';
import styled from 'styled-components';

const HistoryOrder: FC = () => {
  const Body = styled.div`
    margin-top: 10px;
    margin-left: 30px;
  `;

  return (
    <Body>
      <button type="button">Toggle Asc/Desc</button>
    </Body>
  );
};

export default HistoryOrder;
