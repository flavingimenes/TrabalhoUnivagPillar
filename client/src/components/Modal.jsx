import React from 'react';

export default function Modal({ show, title, children, onClose }) {
  if (!show) return null;
  return (
    <div className="modal d-block" tabIndex="-1" style={{background: 'rgba(0,0,0,.5)'}}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}/>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
