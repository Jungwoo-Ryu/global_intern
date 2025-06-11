// src/components/common/DetailButton.tsx
import React from 'react';

export default (params: any) => (
    <button
        className="btn btn-info"
        onClick={() => {
            if (params.onDetailClick) {
                params.onDetailClick(params.data);
            }
        }}
    >
        상세조회
    </button>
);
