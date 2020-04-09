/**
 * This is a layer of indirection.
 * There is no backend right now, but consumers of this proxy is agonstic to that.
 */

class ApiProxy {
  async loadDataset() {
    let response = await fetch(`${window.location.href}/db.csv`);
    let dataset = this._createDatasetFromCsv(await response.text());
    this._cleanYearInDataset(dataset);
    this._addGeoToDataset(dataset);
    return dataset;
  }
  _createDatasetFromCsv(input) {
    let result = {
      headers: [],
      items: []
    };
    let rows = input.split('\n');
    if (rows.length < 1) return result;
    rows.pop();
    let headers = rows.shift().split(',');
    let items = rows.map(function (row) {
      let item = {};
      let fields = row.split(',');
      for (let i = 0; i < headers.length; i++) {
        item[headers[i]] = fields[i];
      }
      return item;
    });
    result.headers = headers;
    result.items = items;
    return result;
  }
  _cleanYearInDataset(dataset) {
    let results = dataset.items.reduce(function (accumulator, current) {
      let year = parseInt(current.year);
      if (!isNaN(year)) {
        current.year = year;
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    dataset.items = results;
  }
  _addGeoToDataset(dataset) {
    let regex = /Point\((-?[0-9]+[.]?[0-9]*) (-?[0-9]+[.]?[0-9]*)\)/;
    dataset.headers = dataset.headers.concat(['lat', 'lng']);
    dataset.items.forEach(item => {
      let captures = regex.exec(item['locationCoordinates']);
      if (captures) {
        item['lat'] = captures[2];
        item['lng'] = captures[1];
      }
    });
  }
}

export default ApiProxy;