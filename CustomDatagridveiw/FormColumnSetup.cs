using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace FP.CustomDataGridVeiw
{
    sealed partial class FormColumnSetup : Form
    {
        public DataTable Datatable;
        public FormColumnSetup(DataTable datatable)
        {
            InitializeComponent();
            Datatable = datatable;
            PopulateColumnList();
        }

        void PopulateColumnList()
        {
            if (Datatable == null || Datatable.Columns.Count == 0)
            {
                MessageBox.Show("Datatable is null or there is no Columns in Datatable");
                return;
            }
            foreach (DataColumn dc in Datatable.Columns)
            {
                checkedListBox1.Items.Add(dc.ColumnName);
            }
        }

        void selectColumns()
        {
            for(int i = 0; i < Datatable.Columns.Count; i++)
            {
                if (!checkedListBox1.GetItemChecked(i))
                {                    
                    Datatable.Columns.Remove(checkedListBox1.Items[i].ToString());
                }

            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            selectColumns();
            this.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.Close();
        }
    }
}
