"use client"

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../(components)/Header";
import { useGetUsersQuery } from "../state/api";

const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 90 },
    { 
        field: "name", 
        headerName: "Product Name", 
        width: 200, 
    },
    { 
        field: "email", 
        headerName: "Email", 
        width: 200, 
    },
]

const Users = () => {

    const { data: users, isError, isLoading } = useGetUsersQuery();
    console.log("users:", users);

    if (isLoading) {
        return <div className="py-4">Loading... </div>
    }

    if (isError || !users) {
        return <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    }

  return (
    <div className="flex flex-col">
      <Header name="Users"/>
      <DataGrid 
        rows={users} 
        columns={columns} 
        getRowId={(row) => row.userId} 
        checkboxSelection 
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 text-gray-700!"/>
    </div>
  )
}

export default Users
