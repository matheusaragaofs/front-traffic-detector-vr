//@ts-nocheck
  
  function calculateRollingAverages(array: number[]) {
    let rollingAverages = [];
    for (let i = 0; i < array.length; i++) {
      let sum = 0;
      for (let j = 0; j <= i; j++) {
        sum += array[j];
      }
      rollingAverages.push(sum / (i + 1));
    }
    return rollingAverages;
  }
  
  function calculateDensityLevels(number_vehicles, rollingAverages) {
    return number_vehicles.map((vehicles, index) => {
      const avg = rollingAverages[index];
      if (vehicles <= avg * 0.8) {
        return [1, 'Baixo'];
      } else if (0.8 * avg < vehicles && vehicles <= avg) {
        return [2, 'Normal'];
      } else if (avg < vehicles && vehicles < avg * 1.5) {
        return [3, 'Congestionado'];
      } else {
        return [4, 'Muito congestionado'];
      }
    });
  }
  
  function processAdvice(densityLevels1, densityLevels2) {
    return densityLevels1.map((level1, index) => {
      const level2 = densityLevels2[index];
      if (level1[0] < level2[0]) {
        return ['Reduza o tempo de verde', 'Extenda o tempo de verde'];
      } else if (level1[0] > level2[0]) {
        return ['Extenda o tempo de verde', 'Reduza o tempo de verde'];
      } else {
        return ['Não alterar os sinais', 'Não alterar os sinais'];
      }
    });
  }
  
 export  function addAttributesToJson(jsonData, id) {
    const camera1Data = jsonData[id][0];
    const camera2Data = jsonData[id][1];
  
    const rollingAverages1 = calculateRollingAverages(camera1Data['number_vehicles']);
    const rollingAverages2 = calculateRollingAverages(camera2Data['number_vehicles']);
  
    const densityLevels1 = calculateDensityLevels(camera1Data['number_vehicles'], rollingAverages1);
    const densityLevels2 = calculateDensityLevels(camera2Data['number_vehicles'], rollingAverages2);
  
    const advice = processAdvice(densityLevels1, densityLevels2);
  
    camera1Data['averageVolume'] = rollingAverages1;
    camera2Data['averageVolume'] = rollingAverages2;
    camera1Data['densityLevel'] = densityLevels1;
    camera2Data['densityLevel'] = densityLevels2;
    camera1Data['advice'] = advice.map(a => a[0]);
    camera2Data['advice'] = advice.map(a => a[1]);

    return jsonData
  }
  
  
  