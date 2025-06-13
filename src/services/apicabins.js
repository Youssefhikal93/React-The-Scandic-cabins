import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getAllCabins({ pageParam = 0 } = {}) {
  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("cabins")
    .select("*", { count: "exact" })
    .range(from, to);

  const { data: cabins, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return {
    cabins,
    count,
    nextPage: to < count - 1 ? pageParam + 1 : null,
    hasMore: to < count - 1,
  };
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted!");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(
    "https://mmxpwidggqxudejlgpxh.supabase.co/"
  );
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `https://mmxpwidggqxudejlgpxh.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  // create/Edit cabon
  let query = supabase.from("cabins");

  //create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select();

  if (error) {
    console.error("Supabase error details:", error);

    throw new Error("cabon cannot be created!");
  }
  //upload img

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(" error details:", storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("cabon cannot be created!");
  }
  return data;
}
