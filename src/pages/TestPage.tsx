function TestPage() {
  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto ">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3">
          <div className="w-full">
            <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
          </div>

          <div className="w-full">
            <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
          </div>

          <div className="w-full">
            <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestPage;
