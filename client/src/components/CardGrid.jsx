import React from 'react';

export default function CardGrid({ items, renderTitle, renderSubtitle, renderFooter, onClick }) {
  return (
    <div className="row g-3">
      {items.map(it => (
        <div className="col-12 col-sm-6 col-lg-4" key={it.key || it.id}>
          <div className="card h-100">
            <div className="card-body" onClick={() => onClick && onClick(it)} style={{cursor: onClick ? 'pointer' : 'default'}}>
              <h5 className="card-title">{renderTitle(it)}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{renderSubtitle && renderSubtitle(it)}</h6>
            </div>
            <div className="card-footer d-flex gap-2 justify-content-end">
              {renderFooter && renderFooter(it)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
