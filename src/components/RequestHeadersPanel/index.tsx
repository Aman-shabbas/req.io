import './index.scss';
import React from 'react';
import { RequestHeaderPanelProps } from './types.ts';
import { Header } from '../RequestPanel/types.ts';
import DeleteIcon from '@mui/icons-material/Delete';

const RequestHeadersPanel = (props: RequestHeaderPanelProps) => {
  const onHeadersChange = (id: number, updatedHeader: Header) => {
    const updatedHeaders = [...props.headers];
    updatedHeaders[id] = updatedHeader;
    props.onHeadersChange(updatedHeaders);
  };

  const onNewHeaderAddition = () => {
    props.onNewHeaderAddition({ key: '', value: '' });
  };

  const onHeaderDelete = (index: number) => {
    const updatedHeaders = props.headers.filter((_, i) => i !== index);
    props.onHeadersChange(updatedHeaders);
  };

  const headerRows = props.headers.map((header: Header, index) => {
    const onHeaderKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onHeadersChange(index, { ...header, key: e.target.value });
    };

    const onHeaderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onHeadersChange(index, { ...header, value: e.target.value });
    };

    return (
      <tr key={index}>
        <td>
          <input type="text" placeholder="Key" value={header.key} onChange={onHeaderKeyChange} />
        </td>
        <td>
          <input
            type="text"
            placeholder="Value"
            value={header.value}
            onChange={onHeaderValueChange}
          />
        </td>
        <td>
          <button className="delete-button" onClick={() => onHeaderDelete(index)}>
            <DeleteIcon fontSize="small" />
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="request-headers-panel">
      {props.headers.length > 0 ? (
        <table className="headers-table">
          <tbody>{headerRows}</tbody>
        </table>
      ) : (
        <p className="placeholder-msg">No headers added yet. Click "Add Header" to create one.</p>
      )}
      <button className="button" onClick={onNewHeaderAddition}>
        Add Header
      </button>
    </div>
  );
};

export default RequestHeadersPanel;
