'use client';

import { useState } from 'react';
import CustomersTab from '../../components/CustomersTab';
import ViewCustomerModal from '../../components/ViewCustomerModal';
import EditCustomerModal from '../../components/EditCustomerModal';

export default function CustomersPage() {
  const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  return (
    <>
      <CustomersTab 
        setShowViewCustomerModal={setShowViewCustomerModal}
        setShowEditCustomerModal={setShowEditCustomerModal}
        setSelectedCustomer={setSelectedCustomer}
      />
      
      <ViewCustomerModal 
        showModal={showViewCustomerModal}
        setShowModal={setShowViewCustomerModal}
        customer={selectedCustomer}
      />
      
      <EditCustomerModal 
        showModal={showEditCustomerModal}
        setShowModal={setShowEditCustomerModal}
        customer={selectedCustomer}
        onSave={(updatedCustomer) => {
          console.log('Updated customer:', updatedCustomer);
        }}
      />
    </>
  );
}
