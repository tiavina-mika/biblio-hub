import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SelectField from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import PasswordField from 'material-ui-password-field';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
  placeholder: {
    color: 'rgba(0, 0, 0, .3)',
    border: 'none',
    fontSize: 16,
  },
  password: {
    color: 'rgba(0, 0, 0, .8)',
    border: 'none',
    fontSize: 16,
    paddingBottom: 3,
    width: '100%',
    textTransform: 'uppercase',
  },
  variant: {
    border: '1px solid rgba(0, 0, 0, .3)',
    padding: 5,
    borderRadius: 3
  }
};
export class fileUpload extends React.Component {
  setRef = (ref) => {
    this.inputRef = ref;
  }

  render() {
    const { input, type, label, inputStyle, accept, variant, helperText, meta: { touched, error } , ...custom} = this.props;

    delete input.value;

    return (
      <div style={{textAlign: 'left', marginTop: 5}}>
          <InputLabel>{label}</InputLabel>
          <TextField
            ref={this.setRef} 
            {...input} 
            {...custom}
            variant={variant}
            margin="normal"
            helperText={touched ? error : helperText}
            type={type} 
            style={{...inputStyle, marginTop: 5}}
            error={touched && error}
            accept={accept} />
       </div>
    );
  }
}

const renderCustomTextField = ({
  classes,
  input,
  placeholder,
  label,
  helperText,
  variant,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    error={touched && error}
    label={label}
    placeholder={placeholder}
    helperText={touched ? error : helperText}
    {...input}
    {...custom}
    margin="normal"
    InputLabelProps={{
      classes: {
        root: classes.placeholder,
      },
    }}
    variant={variant}
    InputProps={{
      style: {
        // paddingBottom: 0,
        '&:hover': {
          borderBottomColor: 'rgba(0, 0, 0, .5)',
        },
      },
    }}
  />;
renderCustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export const renderTextField = withStyles(styles)(renderCustomTextField);

const renderCustomPasswordField = ({
  classes,
  input,
  placeholder,
  label,
  helperText,
  inputStyle,
  variant,
  meta: { touched, error },
  ...custom
}) =>
  <PasswordField
    hintText={touched ? error : helperText}
    floatingLabelText={label}
    errorText={touched && error}
    placeholder={placeholder}
    {...input}
    {...custom}
    style={{...inputStyle}}
    className={classNames(classes.password, variant && variant==="outlined" && classes.variant)}
  />

renderCustomPasswordField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const renderPasswordField = withStyles(styles)(renderCustomPasswordField);

export const renderSelect = ({
  input: { value, onChange },
  label,
  children,
  meta: { touched, error },
  onFieldChange,
  required = false,
  rootClass = '',
}) => (
  <TextField
    required={required}
    classes={{root: rootClass}}
    select
    label={label}
    variant='outlined'
    value={value}
    selected={value ? true : false}
    onChange={e => {
      onChange(e.target.value)
      onFieldChange && onFieldChange(e.target.value)
    }}
    fullWidth
    helperText={touched && error}
  >
    {children}
  </TextField>
)


export const renderMultipleCheckboxSelect = withStyles(() => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 3,
  },
}))(({
  input: { value, onChange, id },
  label,
  children,
  meta: { touched, error },
  onFieldChange,
  required = false,
  multiple,
  classes,
  rootClass = '',
}) => ([
      <InputLabel>{label}</InputLabel>,
      <SelectField
          multiple
          fullWidth
          value={value}
          input={<OutlinedInput/>}
          selected={value ? true : false}

          MenuProps={MenuProps}
          onChange={e => {
            onChange(e.target.value)
            onFieldChange && onFieldChange(e.target.value)
          }}
        >
          {children}
        </SelectField>
    ]
));

export const renderCheckBox = ({
  input: { value, onChange },
  label,
  meta: { touched, error },
  required = false,
}) => (
    <FormControlLabel
      style={{float: 'left'}}
      required={required}
      error={!!(touched && error)}
      control={
        <Checkbox
          color="primary"
          checked={value ? true : false}
          onChange={onChange}
          value={value ? true : false}
        />
      }
      label={label}
      />
)