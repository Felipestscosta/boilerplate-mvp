import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { ListMagnifyingGlass, Plus } from "@phosphor-icons/react";

import Header from "../../components/header";
import ScanCode from "../../components/scancode";

import ExemploTenisBranco from "../../assets/tenis-branco.jpg";

type TaskProps = {
  tasks: Task[];
};

export default function App({ tasks }: TaskProps) {
  const [newTask, setNewTask] = useState("");

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    await fetch("http://localhost:3000/api/tasks/create", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <>
      {/* <Header Title="Serviços" /> */}
      <main className="container mx-auto px-4 relative mt-6">
        {/* <Link
          className="flex w-fit items-center mx-auto mt-10 mb-10 font-bold text-amber-900 text-lg'"
          href="/service-orders/new"
        >
          Novo Serviço
        </Link> */}

        <div className="flex relative w-full mt-9 mb-16">
          <input
            className="bg-zinc-200 rounded-full px-7 py-2 w-full border-none outline-none h-14"
            type="text"
            placeholder="Nome do cliente, Nº serviço..."
          />
          <ListMagnifyingGlass
            className="cursor-pointer absolute right-8 top-4 text-zinc-500"
            size={25}
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex shadow-2xl relative items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900 to-zinc-950">
            <Image
              className="object-cover rounded-3xl absolute z-0 opacity-20 blur-sm"
              alt=""
              src={ExemploTenisBranco}
            />

            <div className="relative p-10 mx-auto w-fit z-2">
              <h3 className="text-zinc-200 font-bold text-3xl mb-4 text-center">
                Lucas Rodrigues
              </h3>
              <div className="flex gap-4 justify-center">
                <p className="text-zinc-200 text-2xl font-medium">12/05/23</p>
                <p className="text-zinc-200 text-2xl font-medium">R$48,00</p>
              </div>
            </div>
          </div>

          <div className="flex shadow-2xl relative items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900 to-zinc-950">
            <Image
              className="object-cover rounded-3xl absolute z-0 opacity-30"
              alt=""
              src={ExemploTenisBranco}
            />

            <div className="relative p-10 mx-auto w-fit z-2">
              <h3 className="text-zinc-200 font-bold text-3xl mb-4 text-center">
                Lucas Rodrigues
              </h3>
              <div className="flex gap-4 justify-center">
                <p className="text-zinc-200 text-2xl font-medium">12/05/23</p>
                <p className="text-zinc-200 text-2xl font-medium">R$48,00</p>
              </div>
            </div>
          </div>

          <div className="flex shadow-2xl relative items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900 to-zinc-950">
            <Image
              className="object-cover rounded-3xl absolute z-0 opacity-30"
              alt=""
              src={ExemploTenisBranco}
            />

            <div className="relative p-10 mx-auto w-fit z-2">
              <h3 className="text-zinc-200 font-bold text-3xl mb-4 text-center">
                Lucas Rodrigues
              </h3>
              <div className="flex gap-4 justify-center">
                <p className="text-zinc-200 text-2xl font-medium">12/05/23</p>
                <p className="text-zinc-200 text-2xl font-medium">R$48,00</p>
              </div>
            </div>
          </div>

          <div className="flex shadow-2xl relative items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900 to-zinc-950">
            <Image
              className="object-cover rounded-3xl absolute z-0 opacity-30"
              alt=""
              src={ExemploTenisBranco}
            />

            <div className="relative p-10 mx-auto w-fit z-2">
              <h3 className="text-zinc-200 font-bold text-3xl mb-4 text-center">
                Lucas Rodrigues
              </h3>
              <div className="flex gap-4 justify-center">
                <p className="text-zinc-200 text-2xl font-medium">12/05/23</p>
                <p className="text-zinc-200 text-2xl font-medium">R$48,00</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ScanCode />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany();

  const data = tasks.map((task) => {
    return {
      id: task.id,
      title: task.title,
      isDone: task.isDone,
      date: task.createdAt.toISOString(),
    };
  });

  return {
    props: {
      tasks: data,
    },
  };
};
