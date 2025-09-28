"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import FoodRushLoader from "@/components/loadingSpinner/FoodRushLoader";


const MyProduct = () => {
    const { data: session } = useSession();
    const { data: products = [], isLoading, error, refetch } = useQuery({
        queryKey: ["products", session?.user?.email],
        queryFn: async () => {
            const res = await axios.get("/api/addProduct", { params: { email: session?.user?.email } });
            return res?.data;
        }
    })

    // product delete from database
    const handleProductDelete = async (id) => {

        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete("/api/addProduct", { params: { id } })
                    console.log("res", res)
                    if (res?.status === 200) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product Successfully Deleted.",
                            icon: "success"
                        });
                        refetch();
                    }

                }
            });

        } catch (error) {
            console.error("Delete failed:", error.response?.data?.message || error.message);
        }
    }


    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <FoodRushLoader/>
        </div>
    );
    //console.log("all Product data:", products)
    return (
        <>
            <Table className="w-11/12 mx-auto my-10">
                <TableHeader>
                    <TableRow className="text-[17px]">
                        <TableHead className="w-[100px]">No.</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map((product, index) => (
                        <TableRow key={product?._id} >
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell><Image src={product?.photo} alt="food" height={60} width={60} className="rounded-md" /></TableCell>
                            <TableCell className="text-[15px]">{product?.productName}</TableCell>
                            <TableCell className="text-[15px]">{product?.price}</TableCell>
                            <TableCell className={`text-[15px] ${product?.status === "pending" ? "text-blue-500" : ""} ${product?.status === "approve" ? "text-green-500" : ""} ${product?.status === "reject" ? "text-red-500" : ""}`}>{product?.status}</TableCell>
                            <TableCell className="text-right">
                                <Link href={`/dashboard/vendor/myProduct/${product?._id}`}>
                                    <button
                                        className="bg-blue-500 cursor-pointer text-white px-2 py-2 rounded-md mr-2 hover:bg-blue-600">
                                        <FaRegEdit />
                                    </button>
                                </Link>

                                <button
                                    onClick={() => handleProductDelete(product?._id)}
                                    className="bg-red-500 cursor-pointer text-white px-2 py-2 rounded-md hover:bg-red-600">
                                    <MdDelete />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </>
    );
};

export default MyProduct;