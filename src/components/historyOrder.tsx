import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';

type Props = {
  isAscending: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const HistoryOrder: FC<Props> = (props: Props) => {
  const { isAscending, onClick } = props;
  const Body = styled.div`
    margin-top: 10px;
    margin-left: 30px;
  `;

  return (
    <Body>
      <button type="button" onClick={onClick}>
        Change to:
        {isAscending ? ' Desc' : ' Asc'}
      </button>
    </Body>
  );
};

export default HistoryOrder;
