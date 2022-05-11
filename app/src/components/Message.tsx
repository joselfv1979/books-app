import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
    fail: string | null;
    success?: string | null;
    cancelMessage: () => void;
};

const Message = ({ fail, success, cancelMessage }: Props) => {
    const variant = fail ? 'danger' : 'success';

    return (
        <Alert
            variant={variant}
            style={{
                height: '4rem',
                width: '100%',
                textAlign: 'center',
            }}
            onClose={cancelMessage}
            dismissible
        >
            {fail || success}
        </Alert>
    );
};

export default Message;
