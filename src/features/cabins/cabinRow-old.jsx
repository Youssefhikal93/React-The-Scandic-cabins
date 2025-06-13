import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const TableRow = styled.div`
  display: grid;
  grid-template-columns:
    minmax(60px, 0.6fr)
    minmax(120px, 1.8fr)
    minmax(140px, 2.2fr)
    minmax(100px, 1fr)
    minmax(100px, 1fr)
    minmax(100px, 1fr);
  column-gap: 1.6rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  min-width: 800px; /* Match header min-width */

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    column-gap: 1rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);

  @media (max-width: 768px) {
    width: 4.8rem;
    transform: scale(1.2) translateX(-5px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;

  @media (max-width: 768px) {
    gap: 0.4rem;

    button {
      padding: 0.4rem;
    }
  }
`;
function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isloading, mutate } = useDeleteCabin(name);
  const { isCreating, createCabin } = useCreateCabin();

  function handelDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt="" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <ActionButtons>
          <button disabled={isCreating} onClick={handelDuplicate}>
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="edit">
              <button disabled={isloading}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm key={cabin.id} cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={cabin.name}
                disabled={isloading}
                onConfirm={() => mutate(cabin.id)}
              />
            </Modal.Window>
          </Modal>
        </ActionButtons>
      </TableRow>

      {/* {showForm && >} */}
    </>
  );
}

export default CabinRow;
