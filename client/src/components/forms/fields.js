import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import SelectField from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
// import Select from 'react-select-plus';

const styles = {
  placeholder: {
    color: 'rgba(0, 0, 0, .3)',
    border: 'none',
    fontSize: 16
  },
};
export class fileUpload extends React.Component {
  setRef = (ref) => {
    this.inputRef = ref;
  }

  render() {
    const { input, type, inputStyle, accept } = this.props;

    delete input.value;

    return (
      <div>
        <label htmlFor={input.name}>
          <input ref={this.setRef} {...input} type={type} style={inputStyle} accept={accept} />
        </label>
      </div>
    );
  }
}

const renderCustomTextField = ({
  classes,
  input,
  placeholder,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    error={touched && error}
    label={label}
    placeholder={placeholder}
    helperText={touched && error}
    {...input}
    {...custom}
    margin="normal"
    InputLabelProps={{
      classes: {
        root: classes.placeholder,
      },
    }}
    InputProps={{
      style: {
        paddingBottom: 0,
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

export const renderSelectField = ({
  input: { onChange, onBlur, value, ...restInput },
  placeholder,
  label,
  meta: { touched, error },
  ...custom
}) =>
	<FormControl error={touched && error}>
		<InputLabel hstyle={{padding: '5px 16px'}}>{label}</InputLabel>
		<SelectField
			onChange={(event, index, value) => {
				onChange([value]);
				if (custom.onChangeFromField) {
				custom.onChangeFromField(value);
				}
			}}
			onBlur={value => onBlur(value)}
			value={value}
			{...restInput}
			{...custom}
			>
			{custom.children}
		</SelectField>
		<FormHelperText>{touched && error}</FormHelperText>
	</FormControl>;

// export const renderSelectPlusField = (props) => {
//   if (props.meta.touched && props.meta.error) {
//     return [
//       <Select
//         key="select"
//         className="react-select-plus-error"
//         {...props}
//         value={props.input.value}
//         onChange={(value) => props.input.onChange(value)}
//         onBlur={() => props.input.onBlur(props.input.value)}
//         options={props.options} />,
//       <div
//         key="error"
//         style={{
//           marginTop: 6,
//           fontSize: 12,
//           lineHeight: '12px',
//           color: 'rgb(244, 67, 54)',
//           transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
//         }}>{props.meta.error}</div>
//     ];
//   }
//   return <Select
//     {...props}
//     value={props.input.value}
//     onChange={(value) => props.input.onChange(value)}
//     onBlur={() => props.input.onBlur(props.input.value)}
//     options={props.options} />;
// };