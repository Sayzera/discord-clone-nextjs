import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
) {
    try {
        /**
         * post isteğindeki urldeki parametreleri almak için new URL(req.url) kullanıyoruz.
         */
        const { searchParams } = new URL(req.url);
        const { name, type} = await req.json();
        const profile = await currentProfile();
        const serverId = searchParams.get('serverId');


        if(!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!serverId) {
            return new NextResponse('Server ID missing', { status: 400 })
        }
        if(name  === 'genel') {
            return new NextResponse('Genel kanalı oluşturulamaz', { status: 400 })
        }
        if(!name) {
            return new NextResponse('Name missing', { status: 400 })
        }
        if(!type) {
            return new NextResponse('Type missing', { status: 400 })
        }  
        
        const existChannel = await db.server.findFirst({
            where: {
                channels: {
                    some: {
                        name: name
                    }
                }
            }
        })

        if(existChannel) {
            return new NextResponse('Channel already exist', { status: 400 })
        }


        /**
         * Server ile ilişkili kanala veri eklemek için update'i seçiyoruz 
         * data içerisinde channels objesi oluşturuyoruz ve içerisine create objesi oluşturuyoruz
         */
        const server = await db.server.update({
             where: {
                id:serverId,
                members: {
                    some: { // belirtilen koşulu sağlayan en az bir öğe varsa 
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
             },
             data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type,
                    }
                }
             },
             include: {
                channels: {
                    include: {
                        Profile: true
                    },
                    orderBy: {
                        name: "asc"
                    }
                    
                }
             }
        })

        return NextResponse.json(server, { status: 201 })




    } catch(error) {
        console.log("[CHANNELS_POST]", error);
        return new NextResponse("Internal Error", { status: 500})
    }
}