import { AgGridReact } from 'ag-grid-react'
import React, { useState, useEffect } from 'react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { useDispatch, useSelector } from 'react-redux'
import { listChucvu } from '../chucvu/chucvuSlice'
import { chucvuService } from '../../../service/chucvuService'
import { useMemo } from 'react'

ModuleRegistry.registerModules([AllCommunityModule])

const grid = () => {
  const data = useSelector((state) => state.chucvus.data)
  const chucvu = data.map((item) => item.tenChucVu)
  const dispatch = useDispatch()
  const [rowData, setRowData] = useState(data)
  console.log('data mới', data)
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: 'id', filter: true },
    {
      field: 'tenChucVu',
      headerName: 'Chức vụ',
      filter: true,
      floatingFilter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: chucvu,
      },
    },
    { field: 'trangThai' },
  ])
  const pagination = true
  const paginationPageSize = 100
  const paginationPageSizeSelector = [10, 50, 100]
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await chucvuService.getChucvu()
        dispatch(listChucvu(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [dispatch])
  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow',
    }
  }, [])
  return (
    <>
      <div style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection={rowSelection}
          pagination={pagination}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  )
}

export default grid
