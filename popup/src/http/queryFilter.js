function queryFilter({ queryData, queryType = 'bodyQuery', originDataInfo }) {
  let dataInfo = {};
  let isFormData = false;
  const dataKeys = Object.keys(queryData[queryType]);
  if (originDataInfo.toString().match('FormData')) {
    dataInfo = new FormData();
    isFormData = true;
  }

  if (isFormData) {
    for (const [key, value] of originDataInfo.entries()) {
      if (dataKeys.includes(key)) dataInfo.append(key, value);
    }
  } else {
    Object.entries(originDataInfo).forEach(([key, value]) => {
      if (dataKeys.includes(key)) dataInfo[key] = value;
    });
  }

  if (isFormData && queryType === 'urlQuery') return Object.fromEntries(dataInfo);
  else return dataInfo;
}

export default queryFilter;
