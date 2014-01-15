using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Text;
using System.Windows.Forms;
using System.Configuration;

namespace FP.CustomDataGridVeiw
{
    [Description("DataGridView that Saves Column Order, Width and Visibility to user.config. Ensure each DataGridView in Application has different name.")]
    [ToolboxBitmap(typeof(System.Windows.Forms.DataGridView))]

    public class CustomDataGridView : DataGridView
    {    

        private Rectangle dragBoxFromMouseDown;
        private int rowIndexFromMouseDown = -1;
        private int rowIndexOfItemUnderMouseToDrop = -1;
        private bool allowReorderRow = false;
        private bool saveColumnsInfo = false;
        private bool setColumnVisible = false;
        private List<string> visibleOptionColumns;
        protected ContextMenuStrip thisContextMenuStrip = new ContextMenuStrip();
        DataGridViewAutoSizeColumnsMode autoFitMode = DataGridViewAutoSizeColumnsMode.None;


        [Description("Set Columns that can set Visiblity, all Columns if its null.")]
        public List<string> VisibleOptionColumns
        {
            get { return visibleOptionColumns; }
            set { visibleOptionColumns = value; }
        }

        [Description("Indicates whether Column's index, visible and width will be saved for this DataGridView.")]
        public bool SaveColumnsInfo
        {
            get { return saveColumnsInfo; }
            set { saveColumnsInfo = value; }
        }

        [Description("Indicates whether manual row repositioning is Enable, Only work on non data-bond Datagridview.")]
        public bool AllowUserToOrderRows
        {
            get { return allowReorderRow; }
            set { allowReorderRow = value; }
        }

        [Description("Indicates whether User can Set Column's Visiblity.")]
        public bool AllowUserToHideColumns
        {
            get { return setColumnVisible; }
            set { setColumnVisible = value; }
        }

        [Description("Auto size Option used when Resize all Columns to fit")]
        [DefaultValue(DataGridViewAutoSizeColumnsMode.None)]
        public DataGridViewAutoSizeColumnsMode AutoFitColumnsMode
        {
            get { return autoFitMode; }
            set { autoFitMode = value; }
        }


        /// <summary>
        /// Clear the Properties from the user.config for this DataGridView.
        /// </summary>
        public void ClearColumnProperties()
        {

            if (!DataGridViewSetting.Default.ColumnOrder.ContainsKey(this.Name))
                return;

            DataGridViewSetting.Default.ColumnOrder.Remove(this.Name);
            DataGridViewSetting.Default.Save();

        }

        protected override void OnColumnHeaderMouseClick(DataGridViewCellMouseEventArgs e)
        {
            if (setColumnVisible && e.Button == System.Windows.Forms.MouseButtons.Right)
            {
                populateMenuStripItems();
                thisContextMenuStrip.Show(Cursor.Position);
            }
            else
            {
                base.OnColumnHeaderMouseClick(e);
            }
        }

        void tsItem_Click(object sender, EventArgs e)
        {
            ToolStripMenuItem tsItem = sender as ToolStripMenuItem;
            this.Columns[tsItem.Name].Visible = tsItem.Checked;

            DataGridViewColumnEventArgs dgve = new DataGridViewColumnEventArgs(this.Columns[tsItem.Name]);
            SaveColumnProperties(dgve);
        }

        void populateMenuStripItems()
        {
            thisContextMenuStrip.Items.Clear();
            thisContextMenuStrip.ShowCheckMargin = true;
            thisContextMenuStrip.ShowImageMargin = false;

            ToolStripMenuItem resizeColumn = new ToolStripMenuItem("Resize All Columns to Fit");
            thisContextMenuStrip.Items.Add(resizeColumn);
            resizeColumn.Click -= new EventHandler(resizeColumn_Click);
            resizeColumn.Click += new EventHandler(resizeColumn_Click);
            ToolStripSeparator sept = new ToolStripSeparator();
            thisContextMenuStrip.Items.Add(sept);

            if (visibleOptionColumns == null)
            {
                foreach (DataGridViewColumn dgvc in this.Columns)
                {
                    ToolStripMenuItem tsItem = new ToolStripMenuItem(dgvc.Name);
                    tsItem.Name = dgvc.Name;
                    tsItem.Checked = dgvc.Visible;
                    tsItem.CheckOnClick = true;
                    tsItem.Click += new EventHandler(tsItem_Click);
                    thisContextMenuStrip.Items.Add(tsItem);
                }
            }
            else
            {
                foreach (DataGridViewColumn dgvc in this.Columns)
                {
                    if (visibleOptionColumns.Contains(dgvc.Name))
                    {
                        ToolStripMenuItem tsItem = new ToolStripMenuItem(dgvc.Name);
                        tsItem.Name = dgvc.Name;
                        tsItem.Checked = dgvc.Visible;
                        tsItem.CheckOnClick = true;
                        tsItem.Click += new EventHandler(tsItem_Click);
                        thisContextMenuStrip.Items.Add(tsItem);
                    }
                }
            }
        }

        void resizeColumn_Click(object sender, EventArgs e)
        {
            if (autoFitMode == DataGridViewAutoSizeColumnsMode.None)
                this.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCells);
            else
                this.AutoResizeColumns(this.autoFitMode);
        }


        


        /// <summary>
        /// Set the DataGridView Column's Width, DisplayIndex and Visiblity.
        /// </summary>
        public void SetColumnProperties()
        {
            if (saveColumnsInfo)
            {
                if (!DataGridViewSetting.Default.ColumnOrder.ContainsKey(this.Name))
                    return;

                List<ColumnOrderItem> columnOrder =
                    DataGridViewSetting.Default.ColumnOrder[this.Name];

                if (columnOrder != null)
                {
                    if (this.Columns.Count > 0)
                    {
                        foreach (ColumnOrderItem column in columnOrder)
                        {
                            try
                            {
                                this.Columns[column.ColumnName].DisplayIndex = column.DisplayIndex;
                                this.Columns[column.ColumnName].Visible = column.Visible;
                                this.Columns[column.ColumnName].Width = column.Width;
                            }
                            catch(Exception ex)
                            {
                                //MessageBox.Show(this.Name + "\n\r"+ ex.Message);
                                //DataGridViewSetting.Default.ColumnOrder.Remove(this.Name);
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Save the DataGridView Column's Width, DisplayIndex and Visibility for e Column.
        /// </summary>
        public void SaveColumnProperties(DataGridViewColumnEventArgs e)
        {
            if (this.saveColumnsInfo)
            {
                if (DataGridViewSetting.Default.ColumnOrder.ContainsKey(this.Name))
                {
                    foreach (ColumnOrderItem column in DataGridViewSetting.Default.ColumnOrder[this.Name])
                    {
                        if (column.ColumnName == e.Column.Name)
                        {
                            column.ColumnIndex = e.Column.Index;
                            column.ColumnName = e.Column.Name;
                            column.DisplayIndex = e.Column.DisplayIndex;
                            column.Visible = e.Column.Visible;
                            column.Width = e.Column.Width;
                            break;
                        }
                    }
                    DataGridViewSetting.Default.Save();
                }
                else
                {
                    SaveColumnProperties();
                }
            }

        }

        /// <summary>
        /// Save the DataGridView Column's Width, DisplayIndex and Visiblility.
        /// </summary>
        public void SaveColumnProperties()
        {
            if (this.saveColumnsInfo)
            {
                try
                {
                    List<ColumnOrderItem> columnOrder = new List<ColumnOrderItem>();
                    DataGridViewColumnCollection columns = this.Columns;
                    foreach (DataGridViewColumn dgvc in columns)
                    {
                        columnOrder.Add(new ColumnOrderItem
                        {
                            ColumnIndex = dgvc.Index,
                            DisplayIndex = dgvc.DisplayIndex,
                            Visible = dgvc.Visible,
                            Width = dgvc.Width,
                            ColumnName = dgvc.Name
                        });
                    }
                    DataGridViewSetting.Default.ColumnOrder[this.Name] = columnOrder;
                    DataGridViewSetting.Default.Save();
                }
                catch (Exception ex)
                {
                    //MessageBox.Show(this.Name +"\n\r"+ex.StackTrace);
                }
            }
        }

        DataTable EscapedDT(DataTable dt)
        {
            foreach (DataRow dr in dt.Rows)
            {
                foreach (DataColumn dc in dt.Columns)
                {
                    if (dc.DataType.ToString() == "System.String")
                    {
                        dr[dc.ColumnName] = Uri.EscapeDataString(dr[dc.ColumnName].ToString());
                    }
                }
            }

            return dt;
        }

        //protected override void OnColumnDisplayIndexChanged(DataGridViewColumnEventArgs e)
        //{
        //    base.OnColumnDisplayIndexChanged(e);
        //    if (this.saveColumnsInfo)
        //        SaveColumnProperties(e);
        //}

        protected override void OnColumnWidthChanged(DataGridViewColumnEventArgs e)
        {
            base.OnColumnWidthChanged(e);
            if (this.saveColumnsInfo)
                SaveColumnProperties(e);
        }

        //protected override void OnDataBindingComplete(DataGridViewBindingCompleteEventArgs e)
        //{
        //    base.OnDataBindingComplete(e);
        //    if (this.saveColumnsInfo)
        //        SetColumnOrder();
        //}


        public void PrintToWebBrowser(HtmlDocument htmlDocument, string invokeFunction)
        {

            DataTable dt;
            dt = ((DataTable)this.DataSource).Copy();
            
            dt.TableName = "dt1";
            FormColumnSetup frmColumnSetup = new FormColumnSetup(dt);
            if (frmColumnSetup.ShowDialog() == DialogResult.OK)
            {
                EscapedDT(dt);
                string jsdt = GetJSONString(dt);

                htmlDocument.InvokeScript(invokeFunction, new object[] { jsdt });
            }
        }

        string GetJSONString(DataTable dt)
        {

            string[] StrDc = new string[dt.Columns.Count];
            string HeadStr = string.Empty;

            for (int i = 0; i < dt.Columns.Count; i++)
            {

                StrDc[i] = dt.Columns[i].Caption;

                HeadStr += "\"" + StrDc[i] + "\" : \"" + StrDc[i] + i.ToString() + "¾" + "\",";
            }

            HeadStr = HeadStr.Substring(0, HeadStr.Length - 1);

            StringBuilder Sb = new StringBuilder();

            Sb.Append("{\"" + dt.TableName.Replace("[", "").Replace("]", "") + "\" : [");

            for (int i = 0; i < dt.Rows.Count; i++)
            {

                string TempStr = HeadStr;
                Sb.Append("{");

                for (int j = 0; j < dt.Columns.Count; j++)
                {

                    TempStr = TempStr.Replace(dt.Columns[j] + j.ToString() + "¾", dt.Rows[i][j].ToString());
                }

                Sb.Append(TempStr + "},");
            }

            Sb = new StringBuilder(Sb.ToString().Substring(0, Sb.ToString().Length - 1));
            if (dt.Rows.Count == 0)
            {
                Sb.Append("[]}");
            }
            else
            {
                Sb.Append("]}");
            }

            return Sb.ToString();
        }

        protected override void OnDataSourceChanged(EventArgs e)
        {
            base.OnDataSourceChanged(e);
            if (this.saveColumnsInfo && this.DataSource != null)
                SetColumnProperties();

            visibleOptionColumns = null;
        }


        //---------------------------------------------------------------------
        protected override void Dispose(bool disposing)
        {
            //gfDataGridViewSetting.Default.Reset();
            if (this.saveColumnsInfo)
                SaveColumnProperties();
            base.Dispose(disposing);
        }


        //-----------------------DRAG AND DROP TO REORDER ROW------------------------------------
        #region Drag Drop Row
        protected override void OnMouseMove(MouseEventArgs e)
        {
            if (this.allowReorderRow)
            {
                if ((e.Button & MouseButtons.Left) == MouseButtons.Left)
                {
                    // If the mouse moves outside the rectangle, start the drag.
                    if (dragBoxFromMouseDown != Rectangle.Empty && !dragBoxFromMouseDown.Contains(e.X, e.Y))
                    {
                        // Proceed with the drag and drop, passing in the list item.                    
                        DragDropEffects dropEffect = this.DoDragDrop(this.Rows[rowIndexFromMouseDown], DragDropEffects.Move);
                    }
                }
                else
                {
                    rowIndexOfItemUnderMouseToDrop = -1;
                }
            }
            base.OnMouseMove(e);

        }

        protected override void OnDragDrop(DragEventArgs drgevent)
        {
            if (this.allowReorderRow)
            {
                if (drgevent.Data.GetDataPresent(typeof(DataGridViewRow)))
                {
                    // The mouse locations are relative to the screen, so they must be
                    // converted to client coordinates.
                    Point clientPoint = this.PointToClient(new Point(drgevent.X, drgevent.Y));
                    // Get the row index of the item the mouse is below.
                    rowIndexOfItemUnderMouseToDrop = this.HitTest(clientPoint.X, clientPoint.Y).RowIndex;
                    if (rowIndexOfItemUnderMouseToDrop != -1)
                    {
                        if (drgevent.Effect == DragDropEffects.Move)
                        {
                            try
                            {
                                DataGridViewRow rowToMove = drgevent.Data.GetData(typeof(DataGridViewRow)) as DataGridViewRow;
                                this.Rows.RemoveAt(rowIndexFromMouseDown);
                                this.Rows.Insert(rowIndexOfItemUnderMouseToDrop, rowToMove);
                                this.Rows[rowIndexOfItemUnderMouseToDrop].Selected = true;
                            }
                            catch (Exception ex)
                            {
                                MessageBox.Show(ex.Message);
                            }
                        }
                    }
                }
            }
            base.OnDragDrop(drgevent);


        }

        protected override void OnMouseDown(MouseEventArgs e)
        {
            if (this.allowReorderRow)
            {
                // Get the index of the item the mouse is below.
                rowIndexFromMouseDown = this.HitTest(e.X, e.Y).RowIndex;
                if (rowIndexFromMouseDown != -1)
                {
                    // Remember the point where the mouse down occurred. 
                    // The DragSize indicates the size that the mouse can move 
                    // before a drag event should be started.                
                    Size dragSize = SystemInformation.DragSize;
                    // Create a rectangle using the DragSize, with the mouse position being
                    // at the center of the rectangle.
                    dragBoxFromMouseDown = new Rectangle(new Point(e.X - (dragSize.Width / 2), e.Y - (dragSize.Height / 2)),
                    dragSize);
                }
                else
                    // Reset the rectangle if the mouse is not over an item in the ListBox.
                    dragBoxFromMouseDown = Rectangle.Empty;
            }
            base.OnMouseDown(e);

        }

        protected override void OnDragOver(DragEventArgs drgevent)
        {
            if (this.allowReorderRow)
            {
                if (drgevent.Data.GetDataPresent(typeof(DataGridViewRow)))
                {
                    int CurRow = this.HitTest(this.PointToClient(new Point(drgevent.X, drgevent.Y)).X, this.PointToClient(new Point(drgevent.X, drgevent.Y)).Y).RowIndex;
                    if (rowIndexOfItemUnderMouseToDrop != CurRow)
                    {
                        rowIndexOfItemUnderMouseToDrop = CurRow;
                        this.Invalidate(); //repaint
                    } //end if

                    drgevent.Effect = DragDropEffects.Move;
                }
            }
            base.OnDragOver(drgevent);

        }

        protected override void OnRowPostPaint(DataGridViewRowPostPaintEventArgs e)
        {
            if (this.allowReorderRow)
            {
                if (e.RowIndex == rowIndexOfItemUnderMouseToDrop && rowIndexOfItemUnderMouseToDrop < this.RowCount)
                {
                    Pen p = new Pen(Color.Red, 1);
                    e.Graphics.DrawLine(p, e.RowBounds.Left, e.RowBounds.Bottom - 1, e.RowBounds.Right, e.RowBounds.Bottom - 1);
                }
            }
            base.OnRowPostPaint(e);
        }

        #endregion


    }
    //-------------------------------------------------------------------------
    internal sealed class DataGridViewSetting : ApplicationSettingsBase
    {
        private static DataGridViewSetting _defaultInstace =
            (DataGridViewSetting)ApplicationSettingsBase
            .Synchronized(new DataGridViewSetting());
        //---------------------------------------------------------------------
        public static DataGridViewSetting Default
        {
            get { return _defaultInstace; }
        }
        //---------------------------------------------------------------------
        // Because there can be more than one DGV in the user-application
        // a dictionary is used to save the settings for this DGV.
        // As key the name of the control is used.
        [UserScopedSetting]
        [SettingsSerializeAs(SettingsSerializeAs.Binary)]
        [DefaultSettingValue("")]
        public Dictionary<string, List<ColumnOrderItem>> ColumnOrder
        {
            get { return this["ColumnOrder"] as Dictionary<string, List<ColumnOrderItem>>; }
            set { this["ColumnOrder"] = value; }
        }
    }
    //-------------------------------------------------------------------------
    [Serializable]
    public sealed class ColumnOrderItem
    {
        public int DisplayIndex { get; set; }
        public int Width { get; set; }
        public bool Visible { get; set; }
        public int ColumnIndex { get; set; }
        public string ColumnName { get; set; }
    }
}
