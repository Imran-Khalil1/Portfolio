exports.validateSignup = (fields) => {
  if (!fields.name || !fields.email || !fields.password) {
    return false;
  }
  return true;
};

exports.validateSignin = (fields) => {
  if (!fields.email || !fields.password) {
    return false;
  }
  return true;
};

exports.validateTyre = ({
  dedicatedDesk,
  internet,
  powerBackup,
  Kitchen,
  waitingArea,
  PrintingAndScanning,
  conferenceRoom,
  coolingAndHeating,
  receptionServices,
  septateWashroom,
}) => {
  if (
    !dedicatedDesk ||
    !internet ||
    !powerBackup ||
    !Kitchen
  ) {
    return false;
  }
  return true;
};

exports.validateTyreManufacturer = ({ id, title, description, image }) => {
  if (!id || !description || !title || !image) {
    return false;
  }
  return true;
};

exports.validateVehicle = ({ manufacturer, model, variant, year }) => {
  if (!manufacturer || !model || !variant || !year) {
    return false;
  }
  return true;
};

exports.faqValidator = ({ width, profile, rim_diameter, faq }) => {
  if (!width || !profile || !rim_diameter || !faq) {
    return false;
  }
  return true;
};

exports.dealValidator = ({ productId, newPrice }) => {
  if (!productId || !newPrice) {
    return false;
  }
  return true;
};
