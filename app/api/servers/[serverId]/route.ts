import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      serverId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl} = await req.json();
    if(!profile) {
      return new NextResponse("Unauthorized", {
        status: 401,
      })
    }

    const server = await db.server.update({
        where: {
            id: params.serverId,
            profileId: profile.id
        },
        data: {
            name, imageUrl
        }
    })

    return NextResponse.json(server);

  } catch (error) {
    console.error("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}


export async function DELETE(
  req: Request,
  {params} : {params: {serverId: string}}
) {
  try {
    const profile = await currentProfile();
    if(!profile) {
      return new NextResponse("Unauthorized", {
        status: 401
      })
    }
  
    if(!params.serverId) {
      return new NextResponse("Server ID missing", {
        status: 400
      })
    } 

    const response = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id
      }
    })

    return NextResponse.json(response, {status: 200})

  } catch(error) {
    console.log('[SERVER_ID_DELETE]', error)
    return new NextResponse("Internal Error", {status: 500})
  }
  
}