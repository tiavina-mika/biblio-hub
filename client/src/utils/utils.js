export const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
export const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  
export const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export const getFormData = (formData, name, field) => {
  if(field) return formData.append(name, field);
  // if(field && Array.isArray(field)) return formData.append(name, field[0]);
  return null;

// this.props.postAuthor(formData)
}

export const getMessageType = (type) => {
  let messageType;
  if(/info/i.test(type)){
      messageType="info"
  } else if(/warning/i.test(type)) {
      messageType="warning"
  } else if(/error/i.test(type)) {
      messageType="error"
  } else {
      messageType="success"
  }

  return messageType;
}