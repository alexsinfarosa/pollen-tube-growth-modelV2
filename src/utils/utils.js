import moment from "moment";

// PRE FETCHING ---------------------------------------------------------
export const matchIconsToStations = (protocol, station, state) => {
  const { network } = station;
  const { postalCode } = state;

  const newa = `${protocol}//newa2.nrcc.cornell.edu/gifs/newa_small.png`;
  const newaGray = `${protocol}//newa2.nrcc.cornell.edu/gifs/newa_smallGray.png`;
  const airport = `${protocol}//newa2.nrcc.cornell.edu/gifs/airport.png`;
  const airportGray = `${protocol}//newa2.nrcc.cornell.edu/gifs/airportGray.png`;
  const culog = `${protocol}//newa2.nrcc.cornell.edu/gifs/culog.png`;
  const culogGray = `${protocol}//newa2.nrcc.cornell.edu/gifs/culogGray.png`;

  if (
    network === "newa" ||
    network === "njwx" ||
    network === "miwx" ||
    network === "oardc" ||
    ((network === "cu_log" || network === "culog") && station.state !== "NY")
  ) {
    return station.state === postalCode || postalCode === "ALL"
      ? newa
      : newaGray;
  }

  if (network === "cu_log" || network === "culog") {
    return station.state === postalCode || postalCode === "ALL"
      ? culog
      : culogGray;
  }

  if (network === "icao") {
    return station.state === postalCode || postalCode === "ALL"
      ? airport
      : airportGray;
  }
};

// Handling Temperature parameter and Michigan network id adjustment
export const networkTemperatureAdjustment = network => {
  // Handling different temperature parameter for each network
  if (
    network === "newa" ||
    network === "icao" ||
    network === "njwx" ||
    network === "oardc"
  ) {
    return "23";
  } else if (
    network === "miwx" ||
    (network === "cu_log" || network === "culog")
  ) {
    return "126";
  }
};

// Handling Relative Humidity Adjustment
export const networkHumidityAdjustment = network =>
  network === "miwx" ? "143" : "24";

// Handling Michigan state ID adjustment
export const michiganIdAdjustment = station => {
  if (
    station.state === "MI" &&
    station.network === "miwx" &&
    station.id.slice(0, 3) === "ew_"
  ) {
    // example: ew_ITH
    return station.id.slice(3, 6);
  }
  return station.id;
};

// Returns the average of two numbers.
export const avgTwoStringNumbers = (a, b) => {
  const aNum = parseFloat(a);
  const bNum = parseFloat(b);
  return Math.round((aNum + bNum) / 2).toString();
};

export const replaceNonConsecutiveMissingValues = arr => {
  return arr.map((t, i) => {
    if (i === 0 && t === "M") {
      return arr[i + 1];
    } else if (i === arr.length - 1 && t === "M") {
      return arr[i - 1];
    } else if (t === "M" && arr[i - 1] !== "M" && arr[i + 1] !== "M") {
      return avgTwoStringNumbers(arr[i - 1], arr[i + 1]);
    } else {
      return t;
    }
  });
};

// Returns rh array containing new values.
// The new values are calculated according to the equation below.
export const RHAdjustment = arr => {
  return arr.map(e => {
    if (e !== "M") {
      return Math.round(parseFloat(e) / (0.0047 * parseFloat(e) + 0.53));
    } else {
      return e;
    }
  });
};

// Returns average of all the values in array
export const average = data => {
  // handling the case for T and W
  if (data.length === 0) return 0;

  //  calculating average
  let results = data.map(e => parseFloat(e));
  return Math.round(results.reduce((acc, val) => acc + val, 0) / data.length);
};

// Returns array with elements above the second argument of the function
export const aboveValue = (data, value) => {
  return data.map(e => {
    if (e > value) {
      return e;
    }
    return false;
  });
};

// Returns array with elements equal to and above the second argument of the function
export const aboveEqualToValue = (data, value) => {
  return data.map(e => {
    if (e >= value) {
      return e;
    }
    return false;
  });
};

export const delay = t => {
  return new Promise(res => {
    setTimeout(res, t);
  });
};

export const roundDate = (date, duration, method) => {
  return moment(Math[method](+date / +duration) * +duration);
};