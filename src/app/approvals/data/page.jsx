import React from 'react';

const PendingApprovals = () => {
    const approvals = []; // This would typically come from your state or props

    return (
        <div>
            {approvals.length === 0 ? (
                <p>Nothing to approve</p>
            ) : (
                <ul>
                    {approvals.map((approval, index) => (
                        <li key={index}>{approval}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PendingApprovals;
