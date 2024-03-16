import React from "react";

function Menu() {
  return (
    <section className="container mx-auto">
      <div>
        <h1 className="text-5xl from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script inline-block">
          Menu Epazote
        </h1>
        <div className="[&>*]:grid [&>*]:grid-cols-1 [&>*]:sm:grid-cols-[70%_30%] [&>*]:text-center [&>*]:sm:text-start [&>*]:p-2 [&>*]:border [&>*]:rounded-full [&>*]:mt-1 [&>*]:border-customBlack mt-5 max-w-[50rem] [&>*]:bg-gradient-to-r [&>*]:from-[#01AA55] [&>*]:via-white [&>*]:to-[#F62E2C] text-customBlack font-bold">
          <div>
            <span>Empanadas</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$50.00</span>
          </div>
          <div>
            <span>Tostadas</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$50.00</span>
          </div>
          <div>
            <span>Chocolate caliente</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$40.00</span>
          </div>
          <div>
            <span>Cafe</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$15.00</span>
          </div>
          <div>
            <span>Te</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$15.00</span>
          </div>
          <div>
            <span>Jugos (china, limon, tamarindo, fruit punch, chinola)</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$50.00</span>
          </div>
          <div>
            <span>Refresco 20 oz</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$40.00</span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between gap-1 max-w-[50rem]">
        <h1 className="text-3xl from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script inline-block">
          Almuerzo
        </h1>
        <span className="text-2xl sm:text-base sm:text-end font-semibold bg-yellow p-2 rounded-xl text-blackBodyBg">RD$220.00</span>
        </div>
        <div className="[&>*]:grid [&>*]:grid-cols-1 [&>*]:text-center [&>*]:sm:text-start [&>*]:p-2 [&>*]:border [&>*]:rounded-full [&>*]:mt-1 [&>*]:border-customBlack mt-1 max-w-[50rem] [&>*]:bg-gradient-to-r [&>*]:from-[#01AA55] [&>*]:via-white [&>*]:to-[#F62E2C] text-customBlack font-bold">
          <div>
            <span>Arroz blanco</span>
          </div>
          <div>
            <span>Moro rojo</span>
          </div>
          <div>
            <span>Moro negro</span>
          </div>
          <div>
            <span>Chofan</span>
          </div>
          <div>
            <span>Platano maduro</span>
          </div>
          <div>
            <span>Arepita maiz</span>
          </div>
          <div>
            <span>Arepita yuca</span>
          </div>
          <div>
            <span>Habichuela roja</span>
          </div>
          <div>
            <span>Pollo frito</span>
          </div>
          <div>
            <span>Pollo guisado</span>
          </div>
          <div>
            <span>Cerdo guisado</span>
          </div>
          <div>
            <span>Res guisada</span>
          </div>
          <div>
            <span>Albondiga de res</span>
          </div>
          <div>
            <span>Berenjena guisada</span>
          </div>
          <div>
            <span>Ensalada verde</span>
          </div>
          <div>
            <span>Ensalada rusa</span>
          </div>
          <div>
            <span>Ensalada de codito</span>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-3xl from-[#01AA55] via-white to-[#F62E2C] bg-gradient-to-r bg-clip-text text-transparent font-dancing-script inline-block">
          Postres
        </h1>
        <div className="[&>*]:grid [&>*]:grid-cols-1 [&>*]:sm:grid-cols-2 [&>*]:text-center [&>*]:sm:text-start [&>*]:p-2 [&>*]:border [&>*]:rounded-full [&>*]:mt-1 [&>*]:border-customBlack mt-1 max-w-[50rem] [&>*]:bg-gradient-to-r [&>*]:from-[#01AA55] [&>*]:via-white [&>*]:to-[#F62E2C] text-customBlack font-bold">
          <div>
            <span>Pan banana</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$50.00</span>
          </div>
          <div>
            <span>Flan</span>
            <span className="text-2xl sm:text-base sm:text-end">RD$80.00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
