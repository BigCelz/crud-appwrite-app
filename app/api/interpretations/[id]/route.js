import client, { databases } from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// fetch a specific interpretation
async function fetchInterpretation(id) {
  try {
    const interpretation = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      id
    );
    return interpretation;
  } catch (error) {
    console.error("Error fetching interpretations :", error);
    throw new Error("Failed to fetch interpretation");
  }
}

// delete function
async function deleteInterpretation(id) {
  try {
    const interpretation = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      id
    );
    return interpretation;
  } catch (error) {
    console.error("Error deleting interpretations :", error);
    throw new Error("Failed to delete interpretation");
  }
}

// update function
export async function updateInterpretation(id, data) {
  try {
    const interpretation = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      id,
      data
    );
    return interpretation;
  } catch (error) {
    console.error("Error updating interpretation:", error);
    throw new Error("Failed to update interpretation");
  }
}

// next is the GET, DELETTE, PUT functions

// GET function
export async function GET(req, { params }) {
  try{
    const id = params.id;
    const interpretation = await fetchInterpretation(id);
    return NextResponse.json({interpretation})
  }  catch (error) {
    return NextResponse.json(
        {error: "Failed to fetch interpretations"},
        {status: 500}
    )
  }
}

// DELETE function
export async function DELETE(req, { params }) {
  try{
    const id = params.id;
    await deleteInterpretation(id);
    return NextResponse.json({message: "Interpretation deleted"})
  }  catch (error) {
    return NextResponse.json(
        {error: "Failed to delete interpretations"},
        {status: 500}
    )
  }
}

// update/PUT function
export async function PUT(req, { params }) {
  try{
    const id = params.id;
    const interpretation = await req.json();
    await updateInterpretation(id, interpretation)
    return NextResponse.json({message: "Interpretation updated"})
  }  catch (error) {
    return NextResponse.json(
        {error: "Failed to update interpretations"},
        {status: 500}
    )
  }
}

