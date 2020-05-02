import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

export function IdInput({placeholder, onChange}) {
    return (
      <FormControl variant="outlined" className="form-id">
          <OutlinedInput 
              type="text" 
              variant="outlined" 
              color="primary" 
              placeholder={placeholder}
              onChange = {onChange}
              className="input-email" />
      </FormControl>
    );
}

export function NicknameInput({placeholder, onChange}) {
    return (
      <FormControl variant="outlined" className="form-id">
          <OutlinedInput 
              type="text" 
              variant="outlined" 
              color="primary" 
              placeholder={placeholder}
              onChange={onChange} 
              className="input-nickname" />
      </FormControl>
    );
}


export function PasswordInput({placeholder, onChange}) {
    return (
    <FormControl variant="outlined" className="form-password">
        <OutlinedInput 
            type="password"
            autoComplete="off"
            variant="outlined"
            color="primary"
            placeholder={placeholder}
            onChange={onChange}
            className="input-password" />
    </FormControl>
    );
}
