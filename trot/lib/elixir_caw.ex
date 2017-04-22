defmodule ElixirCaw do
  use Trot.Router

  def replicate(n, x) do
    for _ <- 1..n, do: x
  end

  get "/caw/:caw_count" do
    %{"noises" => replicate(caw_count |> String.to_integer, "caw")}
  end

  import_routes Trot.NotFound
end
