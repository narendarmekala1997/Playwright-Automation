const Exceljs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function excelTest()
{
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile("C:/Users/laxmi/Downloads/exceldownloadtest.xlsx")
    const worksheet = workbook.getWorksheet('Sheet1');

    worksheet.eachRow(  (row,rowNumber)=>
    {
    
        row.eachCell(   (cell,colNumber)=>
        
        {
           console.log( cell.value);
    
        })
    
    
    })

}
async function writeExcel(searchText,replaceText,filepath)
{
    
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filepath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
   
    const cell =  worksheet.getCell(output.row,output.col);
    cell.value = replaceText;
   // console.log(cell.value);
   await workbook.xlsx.writeFile(filepath)

}
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,col:-1};
    worksheet.eachRow(  (row,rowNumber)=>
    {
    
        row.eachCell(   (cell,colNumber)=>
        
        {
          if( cell.value === searchText){
            output.row = rowNumber;
            output.col = colNumber;
            //console.log(output.row);
          }
    
        })
    
    
    })
    return output;
}
//writeExcel("Banana","republic","C:/Users/laxmi/Downloads/download.xlsx");
test('Upload and Download excel validation', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    //await page.pause();
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await downloadPromise;
    writeExcel("Apple","Naren","C:/Users/laxmi/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/laxmi/Downloads/download.xlsx");


});
