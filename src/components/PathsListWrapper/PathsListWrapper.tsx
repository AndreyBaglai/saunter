import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import classNames from 'classnames'; 
import { useDispatch, useSelector } from 'react-redux';

import ListPaths from 'components/ListPaths/ListPaths';
import { CloseCircleFilled } from '@ant-design/icons';

import { StoreModel } from 'model/store-model';
import { PathModel } from 'model/path-model';

import { getPathsFromLS } from 'services/localStorage';

import styles from './PathsListWrapper.module.scss';


const PathsListWrapper = () => {
  const pathsState = useSelector((state: StoreModel) => state.paths);

  const [filterPaths, setFilterPaths] = useState<PathModel[]>(pathsState);
  const [fieldValue, setFieldValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (getPathsFromLS().length > 0) {
      setFilterPaths(getPathsFromLS());
      dispatch({ type: 'paths/loadFromLS', payload: getPathsFromLS() });
    }
  }, []);

  useEffect(() => {
    if (fieldValue) {
      const filterPaths = pathsState.filter(
        (path: PathModel) =>
          path.title.toLowerCase().includes(fieldValue.toLowerCase()) ||
          path.description.short.toLowerCase().includes(fieldValue.toLowerCase()),
      );

      setFilterPaths(filterPaths);
    } else {
      setFilterPaths(pathsState);
    }
  }, [pathsState]);

  const onClearSearchField = () => {
    setFieldValue('');
    setFilterPaths(pathsState);
  };

  const onFilterPaths = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    if (value === '') {
      onClearSearchField();
    }

    // sort by fields
    const filterPaths = pathsState.filter(
      (path: PathModel) =>
        path.title.toLowerCase().includes(value.toLowerCase()) ||
        path.description.short.toLowerCase().includes(value.toLowerCase()),
    );

    setFieldValue(value);
    setFilterPaths(filterPaths);
  };

  return (
    <Col className={classNames('col-xl-6', 'col-lg-6', 'col-md-6', 'col-sm-12', styles.listWrapper)}>
      <Row>
        <Col span={24}>
          <Input
            value={fieldValue}
            id="search"
            className={styles.inputSearch}
            placeholder="Input search text"
            onChange={onFilterPaths}
            suffix={<CloseCircleFilled onClick={onClearSearchField} className={styles.icon} />}
          />
        </Col>
      </Row>

      <ListPaths filterPaths={filterPaths} />
    </Col>
  );
};

export default PathsListWrapper;
