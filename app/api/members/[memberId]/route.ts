import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
){
    try {
        const { searchParams } = new URL(req.url);
        const profile = await currentProfile();
        const serverId = searchParams.get("serverId");
        const memberId = params.memberId;

        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!serverId) {
            return new NextResponse("Server ID missing", {status: 400})
        }
        if(!memberId) {
            return new NextResponse("Member ID missing", {status: 400})
        }

   
        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id
            }, 
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        // Yanlışlıkla kendimizi silmeyelim diye
                        profileId: {
                            not: profile.id
                        }
                    }
                }
            },
            /**
             * include eklenmez ise sadece server bilgileri döner.
             */
            include: {
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        })

        return NextResponse.json(server, {status: 200})
        
    } catch (error) {
        console.log("[MEMBERS_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500})
    }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    
    const  { role } = await req.json();
    const serverId = searchParams.get("serverId");

    /*
    * searchParams: 
    searchParams: URLSearchParams {
    'memberId' => '63f5615a-00d7-441d-95c8-049e8036c056',
    'serverId' => 'dde43cca-aa9f-4408-b34d-c05d32d02386' }
    }
    params: { memberId: '63f5615a-00d7-441d-95c8-049e8036c056' }
    */


    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!serverId) {
        return new NextResponse("Server ID missing", {status: 400})
    }
    
    if(!params.memberId) {
        return new NextResponse("Member ID missing", {status: 400})
    }

    const server = await db.server.update({
        where: {
            id: serverId,
            profileId: profile.id
        },
        data: {
            members: {
                update: {
                    where: {
                        id: params.memberId,
                        profileId: {
                            // Kendi sunucumuz değilse 
                            not: profile.id
                        }
                    },
                    data: {
                        role: role
                    }
                }
            }
        },
        /**
         * Yapılan bu update işleminde geriye ek olarak 
         * nelerin dönmesini istiyorsak onları belirtiyoruz.
         */
        include: {
            members: {
                include: {
                    profile:true
                },
                orderBy: {
                    role: "asc"
                }
            },
            
        }
    })

    return NextResponse.json(server, {status: 200})
 
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
