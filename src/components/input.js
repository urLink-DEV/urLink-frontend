import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

export function IdInput({ name, placeholder, onChange }) {
    return (
        <FormControl variant="outlined" className="form-id">
            <OutlinedInput
                name={name}
                type="text"
                variant="outlined"
                color="primary"
                placeholder={placeholder}
                className="input-email"
                onChange={onChange} />
        </FormControl>
    );
}

export function NicknameInput({ name, placeholder, onChange }) {
    return (
        <FormControl variant="outlined" className="form-id">
            <OutlinedInput
                name={name}
                type="text"
                variant="outlined"
                color="primary"
                placeholder={placeholder}
                className="input-nickname"
                onChange={onChange} />
        </FormControl>
    );
}

export function PasswordInput({ name, placeholder, onChange }) {
    return (
        <FormControl variant="outlined" className="form-password">
            <OutlinedInput
                name = {name}
                type="password"
                autoComplete="off"
                variant="outlined"
                color="primary"
                placeholder={placeholder}
                className="input-password"
                onChange={onChange} />
        </FormControl>
    );
}