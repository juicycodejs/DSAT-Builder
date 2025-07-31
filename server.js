
const express = require('express');
const path = require('path');
const { createWorkbook } = require('./excelExport');
const XLSX = require('xlsx');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.use(express.json({limit: '2mb'}));

app.post('/export', (req, res) => {
  const data = req.body;
  if (!data || !data.sections) {
    return res.status(400).send('Invalid data');
  }
  const wb = createWorkbook(data);
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename="TestBuilderExport.xlsx"');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buf);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
