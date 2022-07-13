import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
    error: string | null;
    success?: string | null;
    cancelMessage: () => void;
};

const Message = ({ error, success, cancelMessage }: Props) => {
    const variant = error ? 'danger' : 'success';

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
            {error || success}
        </Alert>
    );
};

export default Message;
