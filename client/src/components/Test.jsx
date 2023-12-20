import Layout from "./Layout";
import ContactLayout from "./contact/ContactLayout";

const Test = () => {
  return (
    <Layout>
      <ContactLayout>
        <div className="lg:w-3/4 md:w-2/3 max-sm:w-0 bg-slate-400 w-3/4">
          conversation
        </div>
      </ContactLayout>
    </Layout>
  );
};

export default Test;
