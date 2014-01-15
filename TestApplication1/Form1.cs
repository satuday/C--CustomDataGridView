using System;
using System.Data;
using System.Windows.Forms;

namespace TestApplication1
{
    public partial class Form1 : Form
    {
        DataTable dt = new DataTable();
        public Form1()
        {
            InitializeComponent();

            dt.Columns.AddRange(new DataColumn[]
            {
                new DataColumn("qty", typeof(System.Int32)), 
                new DataColumn("Itemcode", typeof(System.String)), 
                new DataColumn("description", typeof(System.String))
            });

            dt.Rows.Add(new object[] { 1, "dksfldf", "kjfjdfkj" });
            dt.Rows.Add(new object[] { 2, "dksfldf", "kjfjdfkj" });
            dt.Rows.Add(new object[] { 3, "dksfldf", "kjfjdfkj" });
            dt.Rows.Add(new object[] { 4, "dksfldf", "kjfjdfkj" });

            customDataGridView1.DataSource = dt;

            //customDataGridView1.VisibleOptionColumns = new System.Collections.Generic.List<string>();

            //foreach (DataGridViewColumn dgvc in customDataGridView1.Columns)
            //{
            //    customDataGridView1.VisibleOptionColumns.Add(dgvc.Name);
            //}
            //customDataGridView1.VisibleOptionColumns.Remove("Itemcode");
            //customDataGridView1.Columns["qty"].Visible = false;
            //customDataGridView1.VisibleOptionColumns = new System.Collections.Generic.List<string>() { "Itemcode", "description" };
            customDataGridView1.ColumnDisplayIndexChanged += new DataGridViewColumnEventHandler(customDataGridView1_ColumnDisplayIndexChanged);

        }

        void customDataGridView1_ColumnDisplayIndexChanged(object sender, DataGridViewColumnEventArgs e)
        {
            customDataGridView1.SaveColumnProperties(e);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string startPath = Application.StartupPath;
            string filepath = System.IO.Path.Combine(startPath, "HTMLPage1.htm");
            Uri uri = new Uri(filepath);
            wb.Navigate(uri);
            while (wb.ReadyState != WebBrowserReadyState.Complete)
                Application.DoEvents();

            DataTable dt2 = new DataTable();
            dt2 = dt.Copy();
            DataSet ds = new DataSet();
            ds.Tables.Add(dt);
            ds.Tables.Add(dt2);
            FP.PrintData.PrintData.SendToHtml(wb.Document, ds);
            


            //customDataGridView1.PrintToWebBrowser(wb.Document, "JsonFunction");

        }

        private void button2_Click(object sender, EventArgs e)
        {
            wb.ShowPrintPreviewDialog();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            customDataGridView1.DataSource = null;
            customDataGridView1.DataSource = dt;
        }

        private void button4_Click(object sender, EventArgs e)
        {
            
            FP.Excel.Excel ex = new FP.Excel.Excel();
            ex.ImportExcel(dt);            

        }

        private void customDataGridView1_ColumnHeaderMouseClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            customDataGridView1.Columns[e.ColumnIndex].Selected = true;
        }

        private void customDataGridView1_CellMouseClick(object sender, DataGridViewCellMouseEventArgs e)
        {
            if (e.Button == System.Windows.Forms.MouseButtons.Right && e.RowIndex != -1)
            {
                contextMenuStrip1.Show(Cursor.Position);
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            dt = new DataTable();
            dt.Columns.AddRange(new DataColumn[]
            {
                new DataColumn("qty", typeof(System.Int32)), 
                new DataColumn("Itemcode", typeof(System.String)), 
                new DataColumn("description", typeof(System.String))
            });

            dt.Rows.Add(new object[] { 1, "dksfldf", "kjfjdfkj" });
            dt.Rows.Add(new object[] { 2, "dksfldf", "kjfjdfkj" });
            dt.Rows.Add(new object[] { 3, "dksfldf", "kjfjdfkj" });
            dt.Rows.Add(new object[] { 4, "dksfldf", "kjfjdfkj" });

            customDataGridView1.DataSource = dt;
        }
    }
}
